// API Base URL
const API_BASE_URL = 'http://localhost:9090/api';

// Global variables
let currentTab = 'dashboard';
let charts = {};
let currentData = {};
let editingItem = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Custlysis Dashboard Initialized');
    setupEventListeners();
    loadDashboard();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation menu
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.tab;
            switchTab(tab);
        });
    });

    // Sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        });
    }
}

// Switch between tabs
function switchTab(tab) {
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`[data-tab="${tab}"]`);
    if (activeItem) activeItem.classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        customers: 'Customer Management',
        accounts: 'Account Overview',
        products: 'Product Management',
        transactions: 'Transaction History',
        campaigns: 'Marketing Campaigns',
        analytics: 'Analytics & Reports',
        recommendations: 'AI Recommendations'
    };
    
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = titles[tab] || 'Dashboard';
    currentTab = tab;
    
    // Load content based on tab
    switch(tab) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'customers':
            loadCustomers();
            break;
        case 'accounts':
            loadAccounts();
            break;
        case 'products':
            loadProducts();
            break;
        case 'tran   sactions':
            loadTransactions();
            break;
        case 'campaigns':
            loadCampaigns();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'recommendations':
            loadRecommendations();
            break;
    }
}

// Show loading spinner
function showLoading() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) loadingSpinner.classList.add('show');
}

// Hide loading spinner
function hideLoading() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) loadingSpinner.classList.remove('show');
}

// API call helper
async function apiCall(endpoint, options = {}) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API call failed:', error);
        showError(`Failed to load data: ${error.message}`);
        return null;
    } finally {
        hideLoading();
    }
}

// Show error message
function showError(message) {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 40px; color: #e74c3c;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>Error</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 20px;">
                    <i class="fas fa-refresh"></i> Retry
                </button>
            </div>
        `;
    }
}

// Load Dashboard
async function loadDashboard() {
    const content = document.getElementById('content');
    if (!content) return;
    
    content.innerHTML = `
        <div class="fade-in">
            <!-- Stats Cards -->
            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Customers</h3>
                        <div class="stat-card-icon customers">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="totalCustomers">Loading...</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+12% from last month</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Active Accounts</h3>
                        <div class="stat-card-icon accounts">
                            <i class="fas fa-university"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="totalAccounts">Loading...</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+8% from last month</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Products</h3>
                        <div class="stat-card-icon products">
                            <i class="fas fa-box"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="totalProducts">Loading...</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>Available</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Transactions</h3>
                        <div class="stat-card-icon transactions">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="totalTransactions">Loading...</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+15% from last month</span>
                    </div>
                </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="data-table-container">
                <div class="table-header">
                    <h3>System Status</h3>
                </div>
                <div style="padding: 20px;">
                    <p>✅ Database Connected</p>
                    <p>✅ API Server Running</p>
                    <p>✅ Frontend Loaded</p>
                    <p>Navigate to different sections using the sidebar to manage your banking data.</p>
                </div>
            </div>
        </div>
    `;
    
    // Load dashboard data
    loadDashboardData();
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Load customers count
        const customers = await apiCall('/customers');
        if (customers) {
            const totalCustomersEl = document.getElementById('totalCustomers');
            if (totalCustomersEl) totalCustomersEl.textContent = customers.length.toLocaleString();
        }
        
        // Load accounts count
        const accounts = await apiCall('/accounts');
        if (accounts) {
            const totalAccountsEl = document.getElementById('totalAccounts');
            if (totalAccountsEl) totalAccountsEl.textContent = accounts.length.toLocaleString();
        }
        
        // Load products count
        const products = await apiCall('/products');
        if (products) {
            const totalProductsEl = document.getElementById('totalProducts');
            if (totalProductsEl) totalProductsEl.textContent = products.length.toLocaleString();
        }
        
        // Load transactions count
        const transactions = await apiCall('/transactions');
        if (transactions) {
            const totalTransactionsEl = document.getElementById('totalTransactions');
            if (totalTransactionsEl) totalTransactionsEl.textContent = transactions.length.toLocaleString();
        }
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Load Customers with CRUD
async function loadCustomers() {
    const customers = await apiCall('/customers');
    currentData.customers = customers;
    
    const content = document.getElementById('content');
    if (!content) return;
    
    if (customers) {
        content.innerHTML = `
            <div class="fade-in">
                <div class="data-table-container">
                    <div class="table-header">
                        <h3>Customer Management</h3>
                        <div class="header-actions">
                            <input type="text" id="customerSearch" placeholder="Search customers..." class="search-input">
                            <button class="btn btn-success" onclick="showAddCustomerModal()">
                                <i class="fas fa-plus"></i> Add Customer
                            </button>
                        </div>
                    </div>
                    ${createCustomerTable(customers)}
                </div>
            </div>
            ${createCustomerModal()}
        `;
        
        // Add search functionality
        const searchInput = document.getElementById('customerSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                filterCustomers(e.target.value);
            });
        }
    }
}

// Create customer table
function createCustomerTable(customers) {
    if (!customers || customers.length === 0) {
        return '<div class="no-data">No customers found</div>';
    }
    
    return `
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Occupation</th>
                    <th>Income</th>
                    <th>Digital Score</th>
                    <th>Risk</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${customers.map(customer => `
                    <tr>
                        <td>${customer.customerId || '-'}</td>
                        <td>
                            <div class="customer-info">
                                <strong>${customer.name || 'N/A'}</strong>
                                <small>${customer.gender || ''} ${customer.maritalStatus ? '• ' + customer.maritalStatus : ''}</small>
                            </div>
                        </td>
                        <td>${customer.location || '-'}</td>
                        <td>${customer.occupation || '-'}</td>
                        <td>
                            <span class="income-badge">${customer.incomeBracket || '-'}</span>
                        </td>
                        <td>
                            <div class="score-display">
                                <span class="score-value">${customer.digitalScore || 0}</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: ${customer.digitalScore || 0}%"></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="status-badge status-${(customer.riskProfile || 'medium').toLowerCase()}">
                                ${customer.riskProfile || 'Medium'}
                            </span>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-icon btn-primary" onclick="showEditCustomerModal(${customer.customerId})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon btn-danger" onclick="deleteCustomer(${customer.customerId})" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Load Accounts with full CRUD
async function loadAccounts() {
    const accounts = await apiCall('/accounts');
    const customers = await apiCall('/customers');
    currentData.accounts = accounts;
    currentData.customers = customers;
    
    const content = document.getElementById('content');
    if (!content) return;
    
    if (accounts) {
        content.innerHTML = `
            <div class="fade-in">
                <div class="data-table-container">
                    <div class="table-header">
                        <h3>Account Management</h3>
                        <div class="header-actions">
                            <input type="text" id="accountSearch" placeholder="Search accounts..." class="search-input">
                            <button class="btn btn-success" onclick="showAddAccountModal()">
                                <i class="fas fa-plus"></i> Add Account
                            </button>
                        </div>
                    </div>
                    ${createAccountTable(accounts)}
                </div>
            </div>
            ${createAccountModal()}
        `;
        
        // Add search functionality
        const searchInput = document.getElementById('accountSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                filterAccounts(e.target.value);
            });
        }
    }
}

// Create account table
function createAccountTable(accounts) {
    if (!accounts || accounts.length === 0) {
        return '<div class="no-data">No accounts found</div>';
    }
    
    return `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Account ID</th>
                    <th>Customer ID</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                    <th>Avg Monthly Txn</th>
                    <th>Overdraft</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${accounts.map(account => `
                    <tr>
                        <td>${account.accountId || '-'}</td>
                        <td>${account.customer?.customerId || '-'}</td>
                        <td>
                            <span class="account-type-badge">${account.accountType || '-'}</span>
                        </td>
                        <td>
                            <span class="balance-amount ${(account.balance || 0) < 0 ? 'negative' : 'positive'}">
                                ₹${(account.balance || 0).toLocaleString()}
                            </span>
                        </td>
                        <td>₹${(account.avgMonthlyTxn || 0).toLocaleString()}</td>
                        <td>
                            <span class="status-badge ${account.overdraftEnabled ? 'status-active' : 'status-inactive'}">
                                ${account.overdraftEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </td>
                        <td>
                            <span class="status-badge ${account.dormantFlag ? 'status-inactive' : 'status-active'}">
                                ${account.dormantFlag ? 'Dormant' : 'Active'}
                            </span>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-icon btn-primary" onclick="showEditAccountModal(${account.accountId})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon btn-danger" onclick="deleteAccount(${account.accountId})" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Account Modal
function createAccountModal() {
    const customerOptions = currentData.customers ? 
        currentData.customers.map(c => `<option value="${c.customerId}">${c.name} (ID: ${c.customerId})</option>`).join('') : '';
    
    return `
        <div class="modal" id="accountModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="accountModalTitle">Add Account</h3>
                    <button class="close-btn" onclick="closeModal('accountModal')">&times;</button>
                </div>
                <form id="accountForm" onsubmit="saveAccount(event)">
                    <!-- Account Information -->
                    <h4 class="form-section-title">Account Information</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="accountCustomer">Customer *</label>
                            <select id="accountCustomer" name="customerId" class="form-control" required>
                                <option value="">Select Customer</option>
                                ${customerOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="accountType">Account Type *</label>
                            <select id="accountType" name="accountType" class="form-control" required>
                                <option value="">Select Type</option>
                                <option value="Checking">Checking</option>
                                <option value="Savings">Savings</option>
                                <option value="Investment">Investment</option>
                                <option value="Credit">Credit</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Financial Information -->
                    <h4 class="form-section-title">Financial Information</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="accountBalance">Current Balance</label>
                            <input type="number" id="accountBalance" name="balance" class="form-control" step="0.01" placeholder="0.00">
                        </div>
                        <div class="form-group">
                            <label for="accountAvgTxn">Average Monthly Transactions</label>
                            <input type="number" id="accountAvgTxn" name="avgMonthlyTxn" class="form-control" step="0.01" placeholder="0.00">
                        </div>
                    </div>
                    
                    <!-- Account Settings -->
                    <h4 class="form-section-title">Account Settings</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="accountOverdraft">Overdraft Protection</label>
                            <select id="accountOverdraft" name="overdraftEnabled" class="form-control">
                                <option value="false">Disabled</option>
                                <option value="true">Enabled</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="accountTenure">Tenure (Months)</label>
                            <input type="number" id="accountTenure" name="tenureMonths" class="form-control" min="0" placeholder="Months since opened">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="accountChannels">Channel Preferences</label>
                            <input type="text" id="accountChannels" name="channelPreferences" class="form-control" placeholder="e.g., Online,Mobile,ATM">
                        </div>
                        <div class="form-group">
                            <label for="accountDormant">Account Status</label>
                            <select id="accountDormant" name="dormantFlag" class="form-control">
                                <option value="false">Active</option>
                                <option value="true">Dormant</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="accountLastActive">Last Active Date</label>
                            <input type="datetime-local" id="accountLastActive" name="lastActiveDate" class="form-control">
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('accountModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function showAddAccountModal() {
    editingItem = null;
    const modalTitle = document.getElementById('accountModalTitle');
    if (modalTitle) modalTitle.textContent = 'Add New Account';
    
    const form = document.getElementById('accountForm');
    if (form) form.reset();
    
    showModal('accountModal');
}

function showEditAccountModal(accountId) {
    if (!currentData.accounts) return;
    
    const account = currentData.accounts.find(a => a.accountId === accountId);
    if (!account) return;
    
    editingItem = account;
    const modalTitle = document.getElementById('accountModalTitle');
    if (modalTitle) modalTitle.textContent = 'Edit Account';
    
    // Populate form fields
    document.getElementById('accountCustomer').value = account.customer?.customerId || '';
    document.getElementById('accountType').value = account.accountType || '';
    document.getElementById('accountBalance').value = account.balance || '';
    document.getElementById('accountAvgTxn').value = account.avgMonthlyTxn || '';
    document.getElementById('accountOverdraft').value = account.overdraftEnabled ? 'true' : 'false';
    document.getElementById('accountTenure').value = account.tenureMonths || '';
    document.getElementById('accountChannels').value = account.channelPreferences || '';
    document.getElementById('accountDormant').value = account.dormantFlag ? 'true' : 'false';
    
    // Format datetime for input
    if (account.lastActiveDate) {
        const date = new Date(account.lastActiveDate);
        document.getElementById('accountLastActive').value = date.toISOString().slice(0, 16);
    }
    
    showModal('accountModal');
}

async function saveAccount(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const accountData = {
        customerId: formData.get('customerId') ? parseInt(formData.get('customerId')) : null,
        accountType: formData.get('accountType') || null,
        balance: formData.get('balance') ? parseFloat(formData.get('balance')) : 0,
        avgMonthlyTxn: formData.get('avgMonthlyTxn') ? parseFloat(formData.get('avgMonthlyTxn')) : 0,
        overdraftEnabled: formData.get('overdraftEnabled') === 'true',
        tenureMonths: formData.get('tenureMonths') ? parseInt(formData.get('tenureMonths')) : 0,
        channelPreferences: formData.get('channelPreferences') || null,
        dormantFlag: formData.get('dormantFlag') === 'true',
        lastActiveDate: formData.get('lastActiveDate') || null
    };
    
    try {
        let result;
        if (editingItem) {
            result = await apiCall(`/accounts/${editingItem.accountId}`, {
                method: 'PUT',
                body: JSON.stringify(accountData)
            });
        } else {
            result = await apiCall('/accounts', {
                method: 'POST',
                body: JSON.stringify(accountData)
            });
        }
        
        if (result) {
            closeModal('accountModal');
            showNotification(editingItem ? 'Account updated successfully!' : 'Account created successfully!', 'success');
            loadAccounts();
        }
    } catch (error) {
        showNotification('Error saving account: ' + error.message, 'error');
    }
}

async function deleteAccount(accountId) {
    if (!confirm('Delete this account? This action cannot be undone.')) return;
    
    try {
        await apiCall(`/accounts/${accountId}`, { method: 'DELETE' });
        showNotification('Account deleted successfully!', 'success');
        loadAccounts();
    } catch (error) {
        showNotification('Error deleting account: ' + error.message, 'error');
    }
}

function filterAccounts(searchTerm) {
    if (!currentData.accounts) return;
    
    const filtered = currentData.accounts.filter(account => 
        account.accountType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.customerId?.toString().includes(searchTerm) ||
        account.accountId?.toString().includes(searchTerm)
    );
    
    const tableContainer = document.querySelector('.data-table-container');
    if (tableContainer) {
        const newTable = createAccountTable(filtered);
        const existingTable = tableContainer.querySelector('table');
        if (existingTable) {
            existingTable.outerHTML = newTable;
        }
    }
}

// Load Products with full CRUD
async function loadProducts() {
    const products = await apiCall('/products');
    currentData.products = products;
    
    const content = document.getElementById('content');
    if (!content) return;
    
    if (products) {
        content.innerHTML = `
            <div class="fade-in">
                <div class="data-table-container">
                    <div class="table-header">
                        <h3>Product Management</h3>
                        <div class="header-actions">
                            <input type="text" id="productSearch" placeholder="Search products..." class="search-input">
                            <button class="btn btn-success" onclick="showAddProductModal()">
                                <i class="fas fa-plus"></i> Add Product
                            </button>
                        </div>
                    </div>
                    ${createProductTable(products)}
                </div>
            </div>
            ${createProductModal()}
        `;
        
        // Add search functionality
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                filterProducts(e.target.value);
            });
        }
    }
}

// Create product table
function createProductTable(products) {
    if (!products || products.length === 0) {
        return '<div class="no-data">No products found</div>';
    }
    
    return `
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Risk Level</th>
                    <th>Rating</th>
                    <th>Popularity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>${product.productId || '-'}</td>
                        <td>
                            <div class="product-info">
                                <strong>${product.name || 'N/A'}</strong>
                                <small>${product.features ? product.features.substring(0, 50) + '...' : ''}</small>
                            </div>
                        </td>
                        <td>
                            <span class="category-badge">${product.category || '-'}</span>
                        </td>
                        <td>${product.subCategory || '-'}</td>
                        <td>
                            <span class="status-badge status-${(product.riskLevel || 'medium').toLowerCase()}">
                                ${product.riskLevel || 'Medium'}
                            </span>
                        </td>
                        <td>
                            <div class="rating-display">
                                <span class="rating-value">${product.avgRating || 0}</span>
                                <div class="stars">
                                    ${generateStars(product.avgRating || 0)}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="popularity-bar">
                                <div class="popularity-fill" style="width: ${product.popularityScore || 0}%"></div>
                                <span class="popularity-text">${product.popularityScore || 0}%</span>
                            </div>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-icon btn-primary" onclick="showEditProductModal(${product.productId})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon btn-danger" onclick="deleteProduct(${product.productId})" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Generate star rating display
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

// Product Modal
function createProductModal() {
    return `
        <div class="modal" id="productModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="productModalTitle">Add Product</h3>
                    <button class="close-btn" onclick="closeModal('productModal')">&times;</button>
                </div>
                <form id="productForm" onsubmit="saveProduct(event)">
                    <!-- Basic Information -->
                    <h4 class="form-section-title">Basic Information</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="productName">Product Name *</label>
                            <input type="text" id="productName" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="productCategory">Category *</label>
                            <select id="productCategory" name="category" class="form-control" required>
                                <option value="">Select Category</option>
                                <option value="Savings">Savings</option>
                                <option value="Checking">Checking</option>
                                <option value="Credit">Credit</option>
                                <option value="Investment">Investment</option>
                                <option value="Loan">Loan</option>
                                <option value="Mortgage">Mortgage</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="productSubCategory">Sub Category</label>
                            <input type="text" id="productSubCategory" name="subCategory" class="form-control" placeholder="e.g., High Yield, Premium, Standard">
                        </div>
                        <div class="form-group">
                            <label for="productRisk">Risk Level</label>
                            <select id="productRisk" name="riskLevel" class="form-control">
                                <option value="">Select Risk Level</option>
                                <option value="Low">Low Risk</option>
                                <option value="Medium">Medium Risk</option>
                                <option value="High">High Risk</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Product Details -->
                    <h4 class="form-section-title">Product Details</h4>
                    <div class="form-row">
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <label for="productFeatures">Features & Benefits</label>
                            <textarea id="productFeatures" name="features" class="form-control" rows="3" placeholder="Describe the key features and benefits of this product"></textarea>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <label for="productEligibility">Eligibility Rules</label>
                            <textarea id="productEligibility" name="eligibilityRules" class="form-control" rows="2" placeholder="Define who is eligible for this product"></textarea>
                        </div>
                    </div>
                    
                    <!-- Performance Metrics -->
                    <h4 class="form-section-title">Performance Metrics</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="productRating">Average Rating (1-5)</label>
                            <input type="number" id="productRating" name="avgRating" class="form-control" min="1" max="5" step="0.1" placeholder="4.5">
                        </div>
                        <div class="form-group">
                            <label for="productPopularity">Popularity Score (0-100)</label>
                            <input type="number" id="productPopularity" name="popularityScore" class="form-control" min="0" max="100" step="0.1" placeholder="85.5">
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('productModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function showAddProductModal() {
    editingItem = null;
    const modalTitle = document.getElementById('productModalTitle');
    if (modalTitle) modalTitle.textContent = 'Add New Product';
    
    const form = document.getElementById('productForm');
    if (form) form.reset();
    
    showModal('productModal');
}

function showEditProductModal(productId) {
    if (!currentData.products) return;
    
    const product = currentData.products.find(p => p.productId === productId);
    if (!product) return;
    
    editingItem = product;
    const modalTitle = document.getElementById('productModalTitle');
    if (modalTitle) modalTitle.textContent = 'Edit Product';
    
    // Populate form fields
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productCategory').value = product.category || '';
    document.getElementById('productSubCategory').value = product.subCategory || '';
    document.getElementById('productRisk').value = product.riskLevel || '';
    document.getElementById('productFeatures').value = product.features || '';
    document.getElementById('productEligibility').value = product.eligibilityRules || '';
    document.getElementById('productRating').value = product.avgRating || '';
    document.getElementById('productPopularity').value = product.popularityScore || '';
    
    showModal('productModal');
}

async function saveProduct(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const productData = {
        name: formData.get('name') || null,
        category: formData.get('category') || null,
        subCategory: formData.get('subCategory') || null,
        features: formData.get('features') || null,
        riskLevel: formData.get('riskLevel') || null,
        eligibilityRules: formData.get('eligibilityRules') || null,
        avgRating: formData.get('avgRating') ? parseFloat(formData.get('avgRating')) : null,
        popularityScore: formData.get('popularityScore') ? parseFloat(formData.get('popularityScore')) : null
    };
    
    try {
        let result;
        if (editingItem) {
            result = await apiCall(`/products/${editingItem.productId}`, {
                method: 'PUT',
                body: JSON.stringify(productData)
            });
        } else {
            result = await apiCall('/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });
        }
        
        if (result) {
            closeModal('productModal');
            showNotification(editingItem ? 'Product updated successfully!' : 'Product created successfully!', 'success');
            loadProducts();
        }
    } catch (error) {
        showNotification('Error saving product: ' + error.message, 'error');
    }
}

async function deleteProduct(productId) {
    if (!confirm('Delete this product? This action cannot be undone.')) return;
    
    try {
        await apiCall(`/products/${productId}`, { method: 'DELETE' });
        showNotification('Product deleted successfully!', 'success');
        loadProducts();
    } catch (error) {
        showNotification('Error deleting product: ' + error.message, 'error');
    }
}

function filterProducts(searchTerm) {
    if (!currentData.products) return;
    
    const filtered = currentData.products.filter(product => 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subCategory?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const tableContainer = document.querySelector('.data-table-container');
    if (tableContainer) {
        const newTable = createProductTable(filtered);
        const existingTable = tableContainer.querySelector('table');
        if (existingTable) {
            existingTable.outerHTML = newTable;
        }
    }
}

// Load Transactions with Insert & View only
async function loadTransactions() {
    const transactions = await apiCall('/transactions');
    const accounts = await apiCall('/accounts');
    currentData.transactions = transactions;
    currentData.accounts = accounts;
    
    const content = document.getElementById('content');
    if (!content) return;
    
    if (transactions) {
        content.innerHTML = `
            <div class="fade-in">
                <div class="data-table-container">
                    <div class="table-header">
                        <h3>Transaction History</h3>
                        <div class="header-actions">
                            <input type="text" id="transactionSearch" placeholder="Search transactions..." class="search-input">
                            <select id="transactionFilter" class="form-control" style="width: 150px; margin-right: 10px;">
                                <option value="">All Types</option>
                                <option value="Credit">Credit</option>
                                <option value="Debit">Debit</option>
                                <option value="Transfer">Transfer</option>
                                <option value="ATM">ATM</option>
                                <option value="Interest">Interest</option>
                            </select>
                  <!--  removed because it is not needed  
                         <button class="btn btn-success" onclick="showAddTransactionModal()">
                                <i class="fas fa-plus"></i> Add Transaction
                            </button>
                            <button class="btn btn-primary" onclick="exportTransactions()">
                                <i class="fas fa-download"></i> Export
                            </button> -->
                        </div>
                    </div>
                    ${createTransactionTable(transactions)}
                </div>
            </div>
            ${createTransactionModal()}
        `;
        
        // Add search functionality
        const searchInput = document.getElementById('transactionSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                filterTransactions();
            });
        }
        
        // Add filter functionality
        const filterSelect = document.getElementById('transactionFilter');
        if (filterSelect) {
            filterSelect.addEventListener('change', function(e) {
                filterTransactions();
            });
        }
    }
}

// Create transaction table (View only - no edit/delete buttons)
function createTransactionTable(transactions) {
    if (!transactions || transactions.length === 0) {
        return '<div class="no-data">No transactions found</div>';
    }
    
    return `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Txn ID</th>
                    <th>Account ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date & Time</th>
                    <th>Channel</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Score</th>
                    <th>Flags</th>
                </tr>
            </thead>
            <tbody>
                ${transactions.map(txn => `
                    <tr>
                        <td>${txn.txnId || '-'}</td>
                        <td>${txn.accountId || '-'}</td>
                        <td>
                            <span class="txn-type-badge txn-${(txn.txnType || '').toLowerCase()}">${txn.txnType || '-'}</span>
                        </td>
                        <td>
                            <span class="amount ${(txn.amount || 0) >= 0 ? 'positive' : 'negative'}">
                                ${(txn.amount || 0) >= 0 ? '+' : ''}₹${Math.abs(txn.amount || 0).toLocaleString()}
                            </span>
                        </td>
                        <td>
                            <div class="datetime-display">
                                <strong>${txn.timestamp ? new Date(txn.timestamp).toLocaleDateString() : '-'}</strong>
                                <small>${txn.timestamp ? new Date(txn.timestamp).toLocaleTimeString() : ''}</small>
                            </div>
                        </td>
                        <td>
                            <span class="channel-badge">${txn.channel || '-'}</span>
                        </td>
                        <td>${txn.merchantCategory || '-'}</td>
                        <td>${txn.geoLocation || '-'}</td>
                        <td>
                            <div class="score-display">
                                <span class="score-value">${txn.txnScore || 0}</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: ${txn.txnScore || 0}%"></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="transaction-flags">
                                ${txn.isRecurring ? '<span class="flag-badge recurring">Recurring</span>' : ''}
                                ${txn.isHighValue ? '<span class="flag-badge high-value">High Value</span>' : ''}
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Transaction Modal (Insert only)
function createTransactionModal() {
    const accountOptions = currentData.accounts ? 
        currentData.accounts.map(acc => `<option value="${acc.accountId}">Account ${acc.accountId} - ${acc.accountType} (Customer ${acc.customerId})</option>`).join('') : '';
    
    return `
        <div class="modal" id="transactionModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Add New Transaction</h3>
                    <button class="close-btn" onclick="closeModal('transactionModal')">&times;</button>
                </div>
                <form id="transactionForm" onsubmit="saveTransaction(event)">
                    <!-- Transaction Details -->
                    <h4 class="form-section-title">Transaction Details</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="txnAccount">Account *</label>
                            <select id="txnAccount" name="accountId" class="form-control" required>
                                <option value="">Select Account</option>
                                ${accountOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="txnType">Transaction Type *</label>
                            <select id="txnType" name="txnType" class="form-control" required>
                                <option value="">Select Type</option>
                                <option value="Credit">Credit</option>
                                <option value="Debit">Debit</option>
                                <option value="Transfer">Transfer</option>
                                <option value="ATM">ATM Withdrawal</option>
                                <option value="Interest">Interest Payment</option>
                                <option value="Fee">Fee</option>
                                <option value="Refund">Refund</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="txnAmount">Amount *</label>
                            <input type="number" id="txnAmount" name="amount" class="form-control" step="0.01" required placeholder="Enter amount (positive for credit, negative for debit)">
                        </div>
                        <div class="form-group">
                            <label for="txnChannel">Channel</label>
                            <select id="txnChannel" name="channel" class="form-control">
                                <option value="">Select Channel</option>
                                <option value="Online">Online Banking</option>
                                <option value="Mobile">Mobile App</option>
                                <option value="ATM">ATM</option>
                                <option value="Branch">Branch</option>
                                <option value="Card">Debit/Credit Card</option>
                                <option value="ACH">ACH Transfer</option>
                                <option value="Wire">Wire Transfer</option>
                                <option value="System">System Generated</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Merchant & Location -->
                    <h4 class="form-section-title">Merchant & Location</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="txnCategory">Merchant Category</label>
                            <select id="txnCategory" name="merchantCategory" class="form-control">
                                <option value="">Select Category</option>
                                <option value="Grocery Stores">Grocery Stores</option>
                                <option value="Gas Stations">Gas Stations</option>
                                <option value="Restaurants">Restaurants</option>
                                <option value="Department Stores">Department Stores</option>
                                <option value="Online Shopping">Online Shopping</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Education">Education</option>
                                <option value="Payroll Deposit">Payroll Deposit</option>
                                <option value="Interest Credit">Interest Credit</option>
                                <option value="Cash Withdrawal">Cash Withdrawal</option>
                                <option value="Internal Transfer">Internal Transfer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="txnLocation">Geographic Location</label>
                            <input type="text" id="txnLocation" name="geoLocation" class="form-control" placeholder="e.g., New York, NY or Online">
                        </div>
                    </div>
                    
                    <!-- Transaction Attributes -->
                    <h4 class="form-section-title">Transaction Attributes</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="txnScore">Transaction Score (0-100)</label>
                            <input type="number" id="txnScore" name="txnScore" class="form-control" min="0" max="100" step="0.1" placeholder="Quality/Risk score">
                        </div>
                        <div class="form-group">
                            <label for="txnDateTime">Transaction Date & Time</label>
                            <input type="datetime-local" id="txnDateTime" name="timestamp" class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <div class="form-check">
                                <input type="checkbox" id="txnRecurring" name="isRecurring" class="form-check-input">
                                <label for="txnRecurring" class="form-check-label">Recurring Transaction</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input type="checkbox" id="txnHighValue" name="isHighValue" class="form-check-input">
                                <label for="txnHighValue" class="form-check-label">High Value Transaction</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('transactionModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Record Transaction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function showAddTransactionModal() {
    const form = document.getElementById('transactionForm');
    if (form) form.reset();
    
    // Set current date/time as default
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('txnDateTime').value = localDateTime;
    
    showModal('transactionModal');
}

async function saveTransaction(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const transactionData = {
        accountId: formData.get('accountId') ? parseInt(formData.get('accountId')) : null,
        txnType: formData.get('txnType') || null,
        amount: formData.get('amount') ? parseFloat(formData.get('amount')) : null,
        timestamp: formData.get('timestamp') || null,
        channel: formData.get('channel') || null,
        merchantCategory: formData.get('merchantCategory') || null,
        geoLocation: formData.get('geoLocation') || null,
        isRecurring: formData.has('isRecurring'),
        isHighValue: formData.has('isHighValue'),
        txnScore: formData.get('txnScore') ? parseFloat(formData.get('txnScore')) : null
    };
    
    try {
        const result = await apiCall('/transactions', {
            method: 'POST',
            body: JSON.stringify(transactionData)
        });
        
        if (result) {
            closeModal('transactionModal');
            showNotification('Transaction recorded successfully!', 'success');
            loadTransactions(); // Reload the transaction list
        }
    } catch (error) {
        showNotification('Error recording transaction: ' + error.message, 'error');
    }
}

function filterTransactions() {
    if (!currentData.transactions) return;
    
    const searchTerm = document.getElementById('transactionSearch').value.toLowerCase();
    const typeFilter = document.getElementById('transactionFilter').value;
    
    const filtered = currentData.transactions.filter(txn => {
        const matchesSearch = !searchTerm || 
            txn.txnType?.toLowerCase().includes(searchTerm) ||
            txn.merchantCategory?.toLowerCase().includes(searchTerm) ||
            txn.geoLocation?.toLowerCase().includes(searchTerm) ||
            txn.channel?.toLowerCase().includes(searchTerm) ||
            txn.accountId?.toString().includes(searchTerm);
            
        const matchesType = !typeFilter || txn.txnType === typeFilter;
        
        return matchesSearch && matchesType;
    });
    
    const tableContainer = document.querySelector('.data-table-container');
    if (tableContainer) {
        const newTable = createTransactionTable(filtered);
        const existingTable = tableContainer.querySelector('table');
        if (existingTable) {
            existingTable.outerHTML = newTable;
        }
    }
}

function exportTransactions() {
    if (!currentData.transactions || currentData.transactions.length === 0) {
        showNotification('No transactions to export', 'error');
        return;
    }
    
    // Create CSV content
    const headers = ['Transaction ID', 'Account ID', 'Type', 'Amount', 'Date', 'Time', 'Channel', 'Category', 'Location', 'Score', 'Recurring', 'High Value'];
    const csvContent = [
        headers.join(','),
        ...currentData.transactions.map(txn => [
            txn.txnId || '',
            txn.accountId || '',
            txn.txnType || '',
            txn.amount || 0,
            txn.timestamp ? new Date(txn.timestamp).toLocaleDateString() : '',
            txn.timestamp ? new Date(txn.timestamp).toLocaleTimeString() : '',
            txn.channel || '',
            txn.merchantCategory || '',
            txn.geoLocation || '',
            txn.txnScore || 0,
            txn.isRecurring ? 'Yes' : 'No',
            txn.isHighValue ? 'Yes' : 'No'
        ].join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Transactions exported successfully!', 'success');
}

async function loadCampaigns() {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `
            <div class="fade-in">
                <div class="data-table-container">
                    <div class="table-header">
                        <h3>Marketing Campaigns</h3>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        Campaign management coming soon...
                    </div>
                </div>
            </div>
        `;
    }
}

async function loadAnalytics() {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `
            <div class="fade-in">
                <div class="data-table-container">
                    <div class="table-header">
                        <h3>Analytics & Reports</h3>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        Analytics coming soon...
                    </div>
                </div>
            </div>
        `;
    }
}

async function loadRecommendations() {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `
            <div class="fade-in">
                <div class="data-table-container">
                    <div class="table-header">
                        <h3>AI Recommendations</h3>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        AI recommendations will work after 2nd phase...
                    </div>
                </div>
            </div>
        `;
    }
}

// Customer Modal Functions
function createCustomerModal() {
    return `
        <div class="modal" id="customerModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="customerModalTitle">Add Customer</h3>
                    <button class="close-btn" onclick="closeModal('customerModal')">&times;</button>
                </div>
                <form id="customerForm" onsubmit="saveCustomer(event)">
                    <!-- Personal Information -->
                    <h4 class="form-section-title">Personal Information</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerName">Full Name *</label>
                            <input type="text" id="customerName" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="customerDob">Date of Birth</label>
                            <input type="date" id="customerDob" name="dob" class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerGender">Gender</label>
                            <select id="customerGender" name="gender" class="form-control">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="customerMaritalStatus">Marital Status</label>
                            <select id="customerMaritalStatus" name="maritalStatus" class="form-control">
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Professional Information -->
                    <h4 class="form-section-title">Professional Information</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerEducation">Education Level</label>
                            <select id="customerEducation" name="educationalLevel" class="form-control">
                                <option value="">Select Education</option>
                                <option value="High School">High School</option>
                                <option value="Bachelor">Bachelor's Degree</option>
                                <option value="Master">Master's Degree</option>
                                <option value="PhD">PhD</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="customerOccupation">Occupation</label>
                            <input type="text" id="customerOccupation" name="occupation" class="form-control" placeholder="e.g., Software Engineer">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerIncome">Income Bracket</label>
                            <select id="customerIncome" name="incomeBracket" class="form-control">
                                <option value="">Select Income</option>
                                <option value="$40K-$60K">$40K-$60K</option>
                                <option value="$50K-$70K">$50K-$70K</option>
                                <option value="$60K-$80K">$60K-$80K</option>
                                <option value="$70K-$90K">$70K-$90K</option>
                                <option value="$80K-$100K">$80K-$100K</option>
                                <option value="$90K-$120K">$90K-$120K</option>
                                <option value="$100K+">$100K+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="customerTenure">Tenure (Days)</label>
                            <input type="number" id="customerTenure" name="tenureDays" class="form-control" min="0" placeholder="Days as customer">
                        </div>
                    </div>
                    
                    <!-- Location Information -->
                    <h4 class="form-section-title">Location Information</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerLocation">Location</label>
                            <input type="text" id="customerLocation" name="location" class="form-control" placeholder="City, State">
                        </div>
                        <div class="form-group">
                            <label for="customerGeoCluster">Geographic Cluster</label>
                            <select id="customerGeoCluster" name="geoCluster" class="form-control">
                                <option value="">Select Cluster</option>
                                <option value="Urban East">Urban East</option>
                                <option value="Urban West">Urban West</option>
                                <option value="Urban Central">Urban Central</option>
                                <option value="Urban South">Urban South</option>
                                <option value="Suburban">Suburban</option>
                                <option value="Rural">Rural</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Banking Profile -->
                    <h4 class="form-section-title">Banking Profile</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerDigitalScore">Digital Score (0-100)</label>
                            <input type="number" id="customerDigitalScore" name="digitalScore" class="form-control" min="0" max="100" step="0.1" placeholder="Digital engagement score">
                        </div>
                        <div class="form-group">
                            <label for="customerRiskProfile">Risk Profile</label>
                            <select id="customerRiskProfile" name="riskProfile" class="form-control">
                                <option value="">Select Risk Level</option>
                                <option value="Low">Low Risk</option>
                                <option value="Medium">Medium Risk</option>
                                <option value="High">High Risk</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerChurnRisk">Churn Risk Score (0-100)</label>
                            <input type="number" id="customerChurnRisk" name="churnRiskScore" class="form-control" min="0" max="100" step="0.1" placeholder="Probability of leaving">
                        </div>
                        <div class="form-group">
                            <label for="customerLanguage">Preferred Language</label>
                            <select id="customerLanguage" name="preferredLanguage" class="form-control">
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('customerModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function showAddCustomerModal() {
    editingItem = null;
    const modalTitle = document.getElementById('customerModalTitle');
    if (modalTitle) modalTitle.textContent = 'Add New Customer';
    
    const form = document.getElementById('customerForm');
    if (form) form.reset();
    
    showModal('customerModal');
}

function showEditCustomerModal(customerId) {
    if (!currentData.customers) return;
    
    const customer = currentData.customers.find(c => c.customerId === customerId);
    if (!customer) return;
    
    editingItem = customer;
    const modalTitle = document.getElementById('customerModalTitle');
    if (modalTitle) modalTitle.textContent = 'Edit Customer';
    
    // Populate all form fields
    document.getElementById('customerName').value = customer.name || '';
    document.getElementById('customerDob').value = customer.dob || '';
    document.getElementById('customerGender').value = customer.gender || '';
    document.getElementById('customerMaritalStatus').value = customer.maritalStatus || '';
    document.getElementById('customerEducation').value = customer.educationalLevel || '';
    document.getElementById('customerOccupation').value = customer.occupation || '';
    document.getElementById('customerIncome').value = customer.incomeBracket || '';
    document.getElementById('customerTenure').value = customer.tenureDays || '';
    document.getElementById('customerLocation').value = customer.location || '';
    document.getElementById('customerGeoCluster').value = customer.geoCluster || '';
    document.getElementById('customerDigitalScore').value = customer.digitalScore || '';
    document.getElementById('customerRiskProfile').value = customer.riskProfile || '';
    document.getElementById('customerChurnRisk').value = customer.churnRiskScore || '';
    document.getElementById('customerLanguage').value = customer.preferredLanguage || 'English';
    
    showModal('customerModal');
}

async function saveCustomer(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const customerData = {
        name: formData.get('name') || null,
        dob: formData.get('dob') || null,
        gender: formData.get('gender') || null,
        maritalStatus: formData.get('maritalStatus') || null,
        educationalLevel: formData.get('educationalLevel') || null,
        occupation: formData.get('occupation') || null,
        incomeBracket: formData.get('incomeBracket') || null,
        location: formData.get('location') || null,
        geoCluster: formData.get('geoCluster') || null,
        digitalScore: formData.get('digitalScore') ? parseFloat(formData.get('digitalScore')) : null,
        riskProfile: formData.get('riskProfile') || null,
        preferredLanguage: formData.get('preferredLanguage') || 'English',
        tenureDays: formData.get('tenureDays') ? parseInt(formData.get('tenureDays')) : 0,
        churnRiskScore: formData.get('churnRiskScore') ? parseFloat(formData.get('churnRiskScore')) : null
    };
    
    try {
        let result;
        if (editingItem) {
            result = await apiCall(`/customers/${editingItem.customerId}`, {
                method: 'PUT',
                body: JSON.stringify(customerData)
            });
        } else {
            result = await apiCall('/customers', {
                method: 'POST',
                body: JSON.stringify(customerData)
            });
        }
        
        if (result) {
            closeModal('customerModal');
            showNotification(editingItem ? 'Customer updated successfully!' : 'Customer created successfully!', 'success');
            loadCustomers();
        }
    } catch (error) {
        showNotification('Error saving customer: ' + error.message, 'error');
    }
}

async function deleteCustomer(customerId) {
    if (!confirm('Delete this customer?')) return;
    
    try {
        await apiCall(`/customers/${customerId}`, { method: 'DELETE' });
        showNotification('Customer deleted!', 'success');
        loadCustomers();
    } catch (error) {
        showNotification('Error deleting customer: ' + error.message, 'error');
    }
}

function filterCustomers(searchTerm) {
    if (!currentData.customers) return;
    
    const filtered = currentData.customers.filter(customer => 
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.occupation?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const tableContainer = document.querySelector('.data-table-container');
    if (tableContainer) {
        const newTable = createCustomerTable(filtered);
        const existingTable = tableContainer.querySelector('table');
        if (existingTable) {
            existingTable.outerHTML = newTable;
        }
    }
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        editingItem = null;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}