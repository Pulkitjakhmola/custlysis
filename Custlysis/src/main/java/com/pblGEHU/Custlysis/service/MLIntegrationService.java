package com.pblGEHU.Custlysis.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class MLIntegrationService {
    
    private static final Logger logger = LoggerFactory.getLogger(MLIntegrationService.class);
    private static final String PYTHON_SCRIPT = "customer_segmentation_model.py";
    
    /**
     * Train the ML model by calling the Python script
     */
    public String trainModel() {
        try {
            logger.info("Starting ML model training...");
            
            ProcessBuilder processBuilder = new ProcessBuilder(
                "python", PYTHON_SCRIPT, "--action", "train"
            );
            processBuilder.redirectErrorStream(true);
            
            Process process = processBuilder.start();
            
            // Read output
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                    logger.info(line);
                }
            }
            
            int exitCode = process.waitFor();
            
            if (exitCode == 0) {
                logger.info("ML model training completed successfully");
                return output.toString();
            } else {
                logger.error("ML model training failed with exit code: " + exitCode);
                return "Training failed: " + output.toString();
            }
            
        } catch (Exception e) {
            logger.error("Error training ML model", e);
            return "Error: " + e.getMessage();
        }
    }
    
    /**
     * Get prediction for a specific customer
     */
    public String predictCustomerSegment(Integer customerId) {
        try {
            logger.info("Predicting segment for customer: " + customerId);
            
            ProcessBuilder processBuilder = new ProcessBuilder(
                "python", PYTHON_SCRIPT, "--action", "predict", "--customer_id", customerId.toString()
            );
            processBuilder.redirectErrorStream(true);
            
            Process process = processBuilder.start();
            
            // Read output
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            
            int exitCode = process.waitFor();
            
            if (exitCode == 0) {
                return output.toString();
            } else {
                logger.error("Prediction failed with exit code: " + exitCode);
                return "Prediction failed";
            }
            
        } catch (Exception e) {
            logger.error("Error predicting customer segment", e);
            return "Error: " + e.getMessage();
        }
    }
    
    /**
     * Get all segments information
     */
    public String getSegments() {
        try {
            logger.info("Fetching all segments...");
            
            ProcessBuilder processBuilder = new ProcessBuilder(
                "python", PYTHON_SCRIPT, "--action", "get_segments"
            );
            processBuilder.redirectErrorStream(true);
            
            Process process = processBuilder.start();
            
            // Read output
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            
            int exitCode = process.waitFor();
            
            if (exitCode == 0) {
                return output.toString();
            } else {
                logger.error("Get segments failed with exit code: " + exitCode);
                return "Failed to get segments";
            }
            
        } catch (Exception e) {
            logger.error("Error getting segments", e);
            return "Error: " + e.getMessage();
        }
    }
}
