#!/usr/bin/env python3
"""
Customer Segmentation ML Model for Custlysis Banking System
===========================================================

A complete machine learning solution for customer segmentation using K-Means clustering.
Designed to integrate with Spring Boot application and MySQL database.

Author: Custlysis Team
Version: 1.0
Date: 2025-01-18
"""

import sys
import json
import logging
import argparse
from datetime import datetime, date
from typing import Dict, List, Tuple, Optional
import warnings
warnings.filterwarnings('ignore')

# Data manipulation and ML libraries
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import joblib

# Database connectivity
import mysql.connector
from mysql.connector import Error

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================================================
# CONFIGURATION
# ============================================================================

DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'database': 'bank_system',
    'user': 'root',
    'password': 'root'
}

MODEL_FILES = {
    'model': 'segmentation_model.pkl',
    'scaler': 'feature_scaler.pkl',
    'metadata': 'model_metadata.json'
}

FEATURE_NAMES = [
    'age', 'tenure_days', 'digital_score', 'churn_risk_score',
    'total_balance', 'num_accounts', 'txn_frequency', 'avg_txn_amount',
    'income_encoded', 'risk_encoded', 'geo_encoded', 'account_diversity'
]


# ============================================================================
# DATABASE CONNECTOR CLASS
# ============================================================================

class DatabaseConnector:
    """Handles all database operations for the segmentation model."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.connection = None
    
    def connect(self) -> bool:
        """Establish database connection."""
        try:
            self.connection = mysql.connector.connect(**self.config)
            if self.connection.is_connected():
                logger.info("Successfully connected to MySQL database")
                return True
        except Error as e:
            logger.error(f"Database connection failed: {e}")
            return False
    
    def disconnect(self):
        """Close database connection."""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            logger.info("Database connection closed")
    
    def fetch_customer_data(self) -> pd.DataFrame:
        """Fetch all customer data with accounts and transactions."""
        query = """
        SELECT 
            c.customer_id,
            c.name,
            c.dob,
            c.gender,
            c.marital_status,
            c.educational_level,
            c.occupation,
            c.income_bracket,
            c.location,
            c.geo_cluster,
            c.digital_score,
            c.risk_profile,
            c.tenure_days,
            c.churn_risk_score,
            c.created_at
        FROM Customer c
        ORDER BY c.customer_id
        """
        try:
            df = pd.read_sql(query, self.connection)
            logger.info(f"Fetched {len(df)} customers from database")
            return df
        except Error as e:
            logger.error(f"Error fetching customer data: {e}")
            return pd.DataFrame()
    
    def fetch_account_data(self) -> pd.DataFrame:
        """Fetch all account data."""
        query = """
        SELECT 
            customer_id,
            account_type,
            balance,
            avg_monthly_txn,
            dormant_flag
        FROM Account
        WHERE dormant_flag = 0
        """
        try:
            df = pd.read_sql(query, self.connection)
            logger.info(f"Fetched {len(df)} accounts from database")
            return df
        except Error as e:
            logger.error(f"Error fetching account data: {e}")
            return pd.DataFrame()
    
    def fetch_transaction_data(self) -> pd.DataFrame:
        """Fetch transaction data aggregated by account."""
        query = """
        SELECT 
            a.customer_id,
            COUNT(t.txn_id) as txn_count,
            AVG(ABS(t.amount)) as avg_amount,
            MAX(t.timestamp) as last_txn_date
        FROM Account a
        LEFT JOIN Transactions t ON a.account_id = t.account_id
        WHERE t.timestamp >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY a.customer_id
        """
        try:
            df = pd.read_sql(query, self.connection)
            logger.info(f"Fetched transaction data for {len(df)} customers")
            return df
        except Error as e:
            logger.error(f"Error fetching transaction data: {e}")
            return pd.DataFrame()
    
    def save_segment_assignments(self, assignments: pd.DataFrame, model_version: str):
        """Save customer segment assignments to database."""
        try:
            cursor = self.connection.cursor()
            
            # Clear existing assignments for this model version
            delete_query = "DELETE FROM SegmentationLabel WHERE model_version = %s"
            cursor.execute(delete_query, (model_version,))
            
            # Insert new assignments
            insert_query = """
            INSERT INTO SegmentationLabel 
            (customer_id, segment_id, segment_name, assigned_on, model_version, segment_score)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            
            for _, row in assignments.iterrows():
                cursor.execute(insert_query, (
                    int(row['customer_id']),
                    row['segment_id'],
                    row['segment_name'],
                    datetime.now(),
                    model_version,
                    float(row['confidence'])
                ))
            
            self.connection.commit()
            logger.info(f"Saved {len(assignments)} segment assignments to database")
            return True
            
        except Error as e:
            logger.error(f"Error saving segment assignments: {e}")
            self.connection.rollback()
            return False
        finally:
            cursor.close()


# ============================================================================
# FEATURE ENGINEERING CLASS
# ============================================================================

class FeatureEngineer:
    """Extracts and engineers features for customer segmentation."""
    
    def __init__(self):
        self.feature_medians = {}
    
    def calculate_age(self, dob: date) -> int:
        """Calculate age from date of birth."""
        if pd.isna(dob):
            return 0
        today = date.today()
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    
    def encode_income_bracket(self, income: str) -> int:
        """Encode income bracket to numerical value."""
        encoding = {
            '₹40K-₹60K': 1, '$40K-$60K': 1,
            '₹50K-₹70K': 2, '$50K-$70K': 2,
            '₹60K-₹80K': 3, '$60K-$80K': 3,
            '₹70K-₹90K': 4, '$70K-$90K': 4,
            '₹80K-₹100K': 5, '$80K-$100K': 5,
            '₹90K-₹120K': 6, '$90K-$120K': 6,
            '₹100K+': 7, '$100K+': 7
        }
        return encoding.get(income, 4)  # Default to middle bracket
    
    def encode_risk_profile(self, risk: str) -> int:
        """Encode risk profile to numerical value."""
        encoding = {'Low': 1, 'Medium': 2, 'High': 3}
        return encoding.get(risk, 2)  # Default to Medium
    
    def encode_geo_cluster(self, geo: str) -> int:
        """Encode geographic cluster to numerical value."""
        if pd.isna(geo):
            return 2
        geo_lower = geo.lower()
        if 'rural' in geo_lower:
            return 1
        elif 'suburban' in geo_lower:
            return 2
        else:  # Urban
            return 3
    
    def extract_features(self, customers_df: pd.DataFrame, accounts_df: pd.DataFrame, 
                        transactions_df: pd.DataFrame) -> pd.DataFrame:
        """Extract all 12 features for each customer."""
        
        logger.info("Starting feature extraction...")
        
        # Aggregate account data by customer
        account_agg = accounts_df.groupby('customer_id').agg({
            'balance': 'sum',
            'account_type': ['count', 'nunique']
        }).reset_index()
        account_agg.columns = ['customer_id', 'total_balance', 'num_accounts', 'account_diversity']
        
        # Merge all data
        features_df = customers_df.merge(account_agg, on='customer_id', how='left')
        features_df = features_df.merge(transactions_df, on='customer_id', how='left')
        
        # Calculate features
        features_df['age'] = features_df['dob'].apply(self.calculate_age)
        features_df['income_encoded'] = features_df['income_bracket'].apply(self.encode_income_bracket)
        features_df['risk_encoded'] = features_df['risk_profile'].apply(self.encode_risk_profile)
        features_df['geo_encoded'] = features_df['geo_cluster'].apply(self.encode_geo_cluster)
        
        # Transaction frequency (transactions per month)
        features_df['txn_frequency'] = features_df['txn_count'].fillna(0) / 6  # Last 6 months
        features_df['avg_txn_amount'] = features_df['avg_amount'].fillna(0)
        
        # Fill missing values with 0 for account-related features
        features_df['total_balance'] = features_df['total_balance'].fillna(0)
        features_df['num_accounts'] = features_df['num_accounts'].fillna(0)
        features_df['account_diversity'] = features_df['account_diversity'].fillna(0)
        
        # Select final feature columns
        feature_cols = ['customer_id'] + FEATURE_NAMES
        final_features = features_df[['customer_id', 'age', 'tenure_days', 'digital_score', 
                                      'churn_risk_score', 'total_balance', 'num_accounts',
                                      'txn_frequency', 'avg_txn_amount', 'income_encoded',
                                      'risk_encoded', 'geo_encoded', 'account_diversity']]
        
        # Handle missing values with median imputation
        for col in FEATURE_NAMES:
            if final_features[col].isna().any():
                median_val = final_features[col].median()
                self.feature_medians[col] = median_val
                final_features[col].fillna(median_val, inplace=True)
                logger.warning(f"Imputed {final_features[col].isna().sum()} missing values in {col}")
        
        logger.info(f"Feature extraction complete. Shape: {final_features.shape}")
        return final_features


# ============================================================================
# CUSTOMER SEGMENTATION MODEL CLASS
# ============================================================================

class CustomerSegmentationModel:
    """Main class for customer segmentation using K-Means clustering."""
    
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.optimal_k = None
        self.segment_names = {}
        self.segment_stats = {}
        self.model_version = f"v1.0_{datetime.now().strftime('%Y%m%d')}"
    
    def find_optimal_k(self, X: np.ndarray, min_k: int = 3, max_k: int = 8) -> int:
        """Find optimal number of clusters using elbow method."""
        logger.info(f"Finding optimal K between {min_k} and {max_k}...")
        
        inertias = []
        silhouette_scores = []
        K_range = range(min_k, max_k + 1)
        
        for k in K_range:
            kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
            kmeans.fit(X)
            inertias.append(kmeans.inertia_)
            
            if k > 1:
                score = silhouette_score(X, kmeans.labels_)
                silhouette_scores.append(score)
            else:
                silhouette_scores.append(0)
        
        # Find elbow point (maximum rate of change decrease)
        if len(inertias) > 2:
            diffs = np.diff(inertias)
            diff_ratios = np.diff(diffs) / diffs[:-1]
            optimal_idx = np.argmax(diff_ratios) + min_k
        else:
            optimal_idx = min_k + 1
        
        # Ensure we have good silhouette score
        if silhouette_scores[optimal_idx - min_k] < 0.3 and len(silhouette_scores) > 2:
            optimal_idx = min_k + np.argmax(silhouette_scores)
        
        logger.info(f"Optimal K determined: {optimal_idx}")
        logger.info(f"Silhouette scores: {[f'{s:.3f}' for s in silhouette_scores]}")
        
        return optimal_idx
    
    def train(self, features_df: pd.DataFrame) -> Dict:
        """Train the K-Means clustering model."""
        logger.info("Starting model training...")
        
        # Separate customer IDs and features
        customer_ids = features_df['customer_id'].values
        X = features_df[FEATURE_NAMES].values
        
        # Check for sufficient data
        if len(X) < 30:
            raise ValueError(f"Insufficient data: {len(X)} customers. Need at least 50.")
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Find optimal K
        self.optimal_k = self.find_optimal_k(X_scaled)
        
        # Train final model
        self.model = KMeans(n_clusters=self.optimal_k, random_state=42, n_init=10)
        labels = self.model.fit_predict(X_scaled)
        
        # Calculate silhouette score
        silhouette_avg = silhouette_score(X_scaled, labels)
        
        # Generate segment statistics and names
        self._generate_segment_stats(features_df, labels)
        self._generate_segment_names()
        
        # Prepare training results
        results = {
            'status': 'success',
            'model_version': self.model_version,
            'clusters': self.optimal_k,
            'customers_processed': len(customer_ids),
            'silhouette_score': float(silhouette_avg),
            'segments': {}
        }
        
        for seg_id, stats in self.segment_stats.items():
            results['segments'][str(seg_id)] = {
                'name': self.segment_names[seg_id],
                'size': int(stats['size']),
                'percentage': float(stats['percentage'])
            }
        
        logger.info(f"Training complete. Silhouette score: {silhouette_avg:.3f}")
        return results
    
    def _generate_segment_stats(self, features_df: pd.DataFrame, labels: np.ndarray):
        """Calculate statistics for each segment."""
        features_df['segment'] = labels
        
        for seg_id in range(self.optimal_k):
            segment_data = features_df[features_df['segment'] == seg_id]
            
            self.segment_stats[seg_id] = {
                'size': len(segment_data),
                'percentage': (len(segment_data) / len(features_df)) * 100,
                'avg_age': segment_data['age'].mean(),
                'avg_balance': segment_data['total_balance'].mean(),
                'avg_digital_score': segment_data['digital_score'].mean(),
                'avg_churn_risk': segment_data['churn_risk_score'].mean(),
                'avg_tenure': segment_data['tenure_days'].mean(),
                'avg_txn_freq': segment_data['txn_frequency'].mean(),
                'avg_income': segment_data['income_encoded'].mean(),
                'avg_risk': segment_data['risk_encoded'].mean()
            }
    
    def _generate_segment_names(self):
        """Generate meaningful names for segments based on characteristics."""
        for seg_id, stats in self.segment_stats.items():
            avg_balance = stats['avg_balance']
            avg_digital = stats['avg_digital_score']
            avg_churn = stats['avg_churn_risk']
            avg_age = stats['avg_age']
            avg_tenure = stats['avg_tenure']
            
            # Naming logic based on characteristics
            if avg_balance > 50000 and avg_digital > 80:
                name = "Digital Elite"
            elif avg_balance > 50000 and avg_digital < 60:
                name = "Traditional Affluent"
            elif avg_age < 35 and avg_digital > 75:
                name = "Digital Natives"
            elif avg_churn > 20:
                name = "At-Risk Customers"
            elif avg_tenure < 365:
                name = "New Customers"
            elif avg_balance < 20000 and stats['avg_txn_freq'] < 5:
                name = "Dormant Savers"
            elif avg_balance > 30000 and avg_digital > 65:
                name = "Growing Professionals"
            else:
                name = f"Standard Segment {seg_id + 1}"
            
            self.segment_names[seg_id] = name
            logger.info(f"Segment {seg_id}: {name} ({stats['size']} customers, {stats['percentage']:.1f}%)")
    
    def predict(self, features_df: pd.DataFrame) -> pd.DataFrame:
        """Predict segments for customers."""
        if self.model is None:
            raise ValueError("Model not trained. Please train the model first.")
        
        customer_ids = features_df['customer_id'].values
        X = features_df[FEATURE_NAMES].values
        X_scaled = self.scaler.transform(X)
        
        # Predict clusters
        labels = self.model.predict(X_scaled)
        
        # Calculate confidence (distance to cluster center)
        distances = self.model.transform(X_scaled)
        min_distances = np.min(distances, axis=1)
        max_distance = np.max(min_distances)
        confidences = 1 - (min_distances / max_distance)
        
        # Create results dataframe
        results = pd.DataFrame({
            'customer_id': customer_ids,
            'segment_id': [str(label) for label in labels],
            'segment_name': [self.segment_names[label] for label in labels],
            'confidence': confidences
        })
        
        return results
    
    def save_model(self):
        """Save model, scaler, and metadata to files."""
        try:
            # Save model
            joblib.dump(self.model, MODEL_FILES['model'])
            logger.info(f"Model saved to {MODEL_FILES['model']}")
            
            # Save scaler
            joblib.dump(self.scaler, MODEL_FILES['scaler'])
            logger.info(f"Scaler saved to {MODEL_FILES['scaler']}")
            
            # Save metadata
            metadata = {
                'model_version': self.model_version,
                'trained_at': datetime.now().isoformat(),
                'optimal_k': self.optimal_k,
                'feature_names': FEATURE_NAMES,
                'segment_names': self.segment_names,
                'segment_stats': {str(k): {key: float(val) if isinstance(val, (np.floating, float)) else int(val) 
                                          for key, val in v.items()} 
                                 for k, v in self.segment_stats.items()}
            }
            
            with open(MODEL_FILES['metadata'], 'w') as f:
                json.dump(metadata, f, indent=2)
            logger.info(f"Metadata saved to {MODEL_FILES['metadata']}")
            
            return True
        except Exception as e:
            logger.error(f"Error saving model: {e}")
            return False
    
    def load_model(self):
        """Load model, scaler, and metadata from files."""
        try:
            # Load model
            self.model = joblib.load(MODEL_FILES['model'])
            logger.info(f"Model loaded from {MODEL_FILES['model']}")
            
            # Load scaler
            self.scaler = joblib.load(MODEL_FILES['scaler'])
            logger.info(f"Scaler loaded from {MODEL_FILES['scaler']}")
            
            # Load metadata
            with open(MODEL_FILES['metadata'], 'r') as f:
                metadata = json.load(f)
            
            self.model_version = metadata['model_version']
            self.optimal_k = metadata['optimal_k']
            self.segment_names = {int(k): v for k, v in metadata['segment_names'].items()}
            self.segment_stats = {int(k): v for k, v in metadata['segment_stats'].items()}
            
            logger.info(f"Metadata loaded. Model version: {self.model_version}")
            return True
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            return False


# ============================================================================
# MAIN EXECUTION FUNCTIONS
# ============================================================================
def train_model():
    logger.info("="*60)
    logger.info("CUSTOMER SEGMENTATION MODEL TRAINING")
    logger.info("="*60)

    db = DatabaseConnector(DB_CONFIG)
    logger.info("STEP 1: Connecting to database...")
    if not db.connect():
        logger.error("Failed to connect to database. Exiting.")
        return {'status': 'error', 'message': 'Database connection failed'}
    
    try:
        logger.info("STEP 2: Fetching customer data...")
        customers_df = db.fetch_customer_data()
        logger.info(f"Customer data shape: {customers_df.shape}")

        logger.info("STEP 3: Fetching account data...")
        accounts_df = db.fetch_account_data()
        logger.info(f"Account data shape: {accounts_df.shape}")

        logger.info("STEP 4: Fetching transaction data...")
        transactions_df = db.fetch_transaction_data()
        logger.info(f"Transaction data shape: {transactions_df.shape}")

        if customers_df.empty:
            raise ValueError("No customer data found in database")

        logger.info("STEP 5: Feature extraction...")
        feature_engineer = FeatureEngineer()
        features_df = feature_engineer.extract_features(customers_df, accounts_df, transactions_df)
        logger.info(f"Features shape: {features_df.shape}")

        logger.info("STEP 6: Training model...")
        model = CustomerSegmentationModel()
        results = model.train(features_df)

        logger.info("STEP 7: Saving model files...")
        model.save_model()

        logger.info("STEP 8: Predicting and saving assignments...")
        assignments = model.predict(features_df)
        db.save_segment_assignments(assignments, model.model_version)

        logger.info("TRAINING COMPLETED SUCCESSFULLY")
        print(json.dumps(results, indent=2))
        return results

    except Exception as e:
        logger.exception("Training failed with an exception")
        return {'status': 'error', 'message': str(e)}
    finally:
        db.disconnect()



def predict_customer(customer_id: int):
    """Predict segment for a specific customer."""
    logger.info(f"Predicting segment for customer {customer_id}")
    
    # Load model
    model = CustomerSegmentationModel()
    if not model.load_model():
        return {'status': 'error', 'message': 'Failed to load model'}
    
    # Connect to database
    db = DatabaseConnector(DB_CONFIG)
    if not db.connect():
        return {'status': 'error', 'message': 'Database connection failed'}
    
    try:
        # Fetch customer data
        customers_df = db.fetch_customer_data()
        customers_df = customers_df[customers_df['customer_id'] == customer_id]
        
        if customers_df.empty:
            return {'status': 'error', 'message': f'Customer {customer_id} not found'}
        
        accounts_df = db.fetch_account_data()
        transactions_df = db.fetch_transaction_data()
        
        # Extract features
        feature_engineer = FeatureEngineer()
        features_df = feature_engineer.extract_features(customers_df, accounts_df, transactions_df)
        
        # Predict
        result = model.predict(features_df)
        
        # Get segment characteristics
        seg_id = int(result['segment_id'].iloc[0])
        characteristics = model.segment_stats[seg_id]
        
        output = {
            'customer_id': customer_id,
            'segment_id': result['segment_id'].iloc[0],
            'segment_name': result['segment_name'].iloc[0],
            'confidence': float(result['confidence'].iloc[0]),
            'characteristics': {
                'avg_balance': float(characteristics['avg_balance']),
                'avg_digital_score': float(characteristics['avg_digital_score']),
                'avg_churn_risk': float(characteristics['avg_churn_risk'])
            }
        }
        
        print(json.dumps(output, indent=2))
        return output
        
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        return {'status': 'error', 'message': str(e)}
    finally:
        db.disconnect()


def get_segments():
    """Get all segment information."""
    logger.info("Retrieving segment information")
    
    # Load model
    model = CustomerSegmentationModel()
    if not model.load_model():
        return {'status': 'error', 'message': 'Failed to load model'}
    
    output = {
        'model_version': model.model_version,
        'total_segments': model.optimal_k,
        'segments': {}
    }
    
    for seg_id, stats in model.segment_stats.items():
        output['segments'][str(seg_id)] = {
            'name': model.segment_names[seg_id],
            'size': int(stats['size']),
            'percentage': float(stats['percentage']),
            'characteristics': {
                'avg_age': float(stats['avg_age']),
                'avg_balance': float(stats['avg_balance']),
                'avg_digital_score': float(stats['avg_digital_score']),
                'avg_churn_risk': float(stats['avg_churn_risk']),
                'avg_tenure_days': float(stats['avg_tenure'])
            }
        }
    
    print(json.dumps(output, indent=2))
    return output


# ============================================================================
# CLI INTERFACE
# ============================================================================

def main():
    """Main CLI interface."""
    parser = argparse.ArgumentParser(
        description='Customer Segmentation ML Model for Custlysis',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python customer_segmentation_model.py --action train
  python customer_segmentation_model.py --action predict --customer_id 123
  python customer_segmentation_model.py --action get_segments
        """
    )
    
    parser.add_argument(
        '--action',
        type=str,
        required=True,
        choices=['train', 'predict', 'get_segments'],
        help='Action to perform'
    )
    
    parser.add_argument(
        '--customer_id',
        type=int,
        help='Customer ID for prediction (required for predict action)'
    )
    
    args = parser.parse_args()
    
    # Execute action
    if args.action == 'train':
        train_model()
    elif args.action == 'predict':
        if not args.customer_id:
            parser.error("--customer_id is required for predict action")
        predict_customer(args.customer_id)
    elif args.action == 'get_segments':
        get_segments()


if __name__ == '__main__':
    main()
