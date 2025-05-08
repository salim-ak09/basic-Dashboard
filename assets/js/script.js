// DOM Elements
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const menuItems = document.querySelectorAll('.menu-item');
const cube = document.querySelector('.cube');
const cubeFaces = document.querySelectorAll('.cube-face');
const statValues = document.querySelectorAll('.stat-value');
const statCharts = document.querySelectorAll('.stat-chart');
const salesChart = document.getElementById('salesChart');
const trafficChart = document.getElementById('trafficChart');
const revenueChart = document.getElementById('revenueChart');
const productChart = document.getElementById('productChart');
const acquisitionChart = document.getElementById('acquisitionChart');
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');
const userCards = document.querySelectorAll('.user-card');
const orderTiles = document.querySelectorAll('.order-tile');
const toastContainer = document.querySelector('.toast-container');

// Theme Toggle
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Show toast notification
  showToast('Theme Changed', 'Dashboard theme has been updated', 'info');
});

// Menu Toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  document.querySelector('.main-content').classList.toggle('expanded');
});

// Navigation
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active class from all menu items
    menuItems.forEach(i => i.classList.remove('active'));
    
    // Add active class to clicked menu item
    item.classList.add('active');
    
    // Get the section to show
    const sectionToShow = item.getAttribute('data-section');
    
    // Rotate the cube to show the selected section
    rotateCube(sectionToShow);
  });
});

// Rotate Cube Function
function rotateCube(section) {
  // Hide all cube faces
  cubeFaces.forEach(face => {
    face.classList.remove('active');
  });
  
  // Show the selected cube face
  const activeFace = document.querySelector(`.${section}-section`);
  if (activeFace) {
    activeFace.classList.add('active');
    
    // Add a small animation to the cube
    cube.style.transform = 'scale(0.95)';
    setTimeout(() => {
      cube.style.transform = 'scale(1)';
    }, 300);
  }
}

// Animate Stat Values
function animateStatValues() {
  statValues.forEach(statValue => {
    const targetValue = parseInt(statValue.getAttribute('data-target'));
    const isCurrency = statValue.textContent.includes('$');
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateValue(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      
      const currentValue = Math.floor(targetValue * easedProgress);
      
      if (isCurrency) {
        statValue.textContent = `$${currentValue.toLocaleString()}`;
      } else {
        statValue.textContent = currentValue.toLocaleString();
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    }
    
    requestAnimationFrame(updateValue);
  });
}

// Draw Stat Charts
function drawStatCharts() {
  statCharts.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate random data points
    const dataPoints = [];
    for (let i = 0; i < 10; i++) {
      dataPoints.push(Math.random() * 0.5 + 0.2); // Values between 0.2 and 0.7
    }
    
    // Draw line chart
    ctx.beginPath();
    ctx.moveTo(0, height * (1 - dataPoints[0]));
    
    for (let i = 1; i < dataPoints.length; i++) {
      const x = (width / (dataPoints.length - 1)) * i;
      const y = height * (1 - dataPoints[i]);
      ctx.lineTo(x, y);
    }
    
    // Style the line
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Fill area under the line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(67, 97, 238, 0.3)');
    gradient.addColorStop(1, 'rgba(67, 97, 238, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
  });
}

// Draw Sales Chart
function drawSalesChart() {
  if (!salesChart) return;
  
  const ctx = salesChart.getContext('2d');
  const width = salesChart.width;
  const height = salesChart.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYearData = [65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 91];
  const previousYearData = [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56];
  
  // Chart dimensions
  const chartWidth = width - 60;
  const chartHeight = height - 60;
  const barWidth = chartWidth / currentYearData.length / 3;
  const barSpacing = barWidth / 2;
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(40, 20);
  ctx.lineTo(40, height - 40);
  ctx.lineTo(width - 20, height - 40);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw bars
  for (let i = 0; i < currentYearData.length; i++) {
    // Current year bar
    const x1 = 40 + (i * (barWidth * 3 + barSpacing));
    const y1 = height - 40 - (currentYearData[i] / 150 * chartHeight);
    const h1 = (currentYearData[i] / 150 * chartHeight);
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.fillRect(x1, y1, barWidth, h1);
    
    // Previous year bar
    const x2 = x1 + barWidth + barSpacing;
    const y2 = height - 40 - (previousYearData[i] / 150 * chartHeight);
    const h2 = (previousYearData[i] / 150 * chartHeight);
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--gray-300');
    ctx.fillRect(x2, y2, barWidth, h2);
    
    // Month label
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(months[i], x1 + barWidth + barSpacing / 2, height - 25);
  }
  
  // Draw legend
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  ctx.fillRect(width - 150, 20, 10, 10);
  
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--gray-300');
  ctx.fillRect(width - 150, 40, 10, 10);
  
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
  ctx.font = '12px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('Current Year', width - 130, 30);
  ctx.fillText('Previous Year', width - 130, 50);
}

// Draw Traffic Chart (Pie Chart)
function drawTrafficChart() {
  if (!trafficChart) return;
  
  const ctx = trafficChart.getContext('2d');
  const width = trafficChart.width;
  const height = trafficChart.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 40;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Data
  const data = [
    { label: 'Direct', value: 35, color: '#4361ee' },
    { label: 'Social', value: 25, color: '#3a0ca3' },
    { label: 'Referral', value: 20, color: '#7209b7' },
    { label: 'Organic', value: 20, color: '#f72585' }
  ];
  
  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Draw pie chart
  let startAngle = -Math.PI / 2;
  
  for (let i = 0; i < data.length; i++) {
    const sliceAngle = (data[i].value / total) * (Math.PI * 2);
    const endAngle = startAngle + sliceAngle;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    
    ctx.fillStyle = data[i].color;
    ctx.fill();
    
    // Draw label
    const labelAngle = startAngle + sliceAngle / 2;
    const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
    const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${data[i].value}%`, labelX, labelY);
    
    startAngle = endAngle;
  }
  
  // Draw center circle (donut hole)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card-bg');
  ctx.fill();
}

// Draw Revenue Chart
function drawRevenueChart() {
  if (!revenueChart) return;
  
  const ctx = revenueChart.getContext('2d');
  const width = revenueChart.width;
  const height = revenueChart.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const revenueData = [12500, 18200, 19500, 16800, 24000, 22000, 26500];
  
  // Chart dimensions
  const chartWidth = width - 60;
  const chartHeight = height - 60;
  const pointSpacing = chartWidth / (revenueData.length - 1);
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(40, 20);
  ctx.lineTo(40, height - 40);
  ctx.lineTo(width - 20, height - 40);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw grid lines
  const gridCount = 5;
  const gridSpacing = chartHeight / gridCount;
  const valueSpacing = 30000 / gridCount;
  
  for (let i = 0; i <= gridCount; i++) {
    const y = height - 40 - (i * gridSpacing);
    
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(width - 20, y);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    // Draw value labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-light');
    ctx.font = '10px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`$${(i * valueSpacing).toLocaleString()}`, 35, y + 3);
  }
  
  // Draw line chart
  ctx.beginPath();
  
  for (let i = 0; i < revenueData.length; i++) {
    const x = 40 + (i * pointSpacing);
    const y = height - 40 - (revenueData[i] / 30000 * chartHeight);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    // Draw day labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(days[i], x, height - 25);
  }
  
  // Style the line
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Draw points
  for (let i = 0; i < revenueData.length; i++) {
    const x = 40 + (i * pointSpacing);
    const y = height - 40 - (revenueData[i] / 30000 * chartHeight);
    
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card-bg');
    ctx.fill();
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  
  // Fill area under the line
  ctx.beginPath();
  
  for (let i = 0; i < revenueData.length; i++) {
    const x = 40 + (i * pointSpacing);
    const y = height - 40 - (revenueData[i] / 30000 * chartHeight);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.lineTo(40 + ((revenueData.length - 1) * pointSpacing), height - 40);
  ctx.lineTo(40, height - 40);
  ctx.closePath();
  
  // Create gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(67, 97, 238, 0.3)');
  gradient.addColorStop(1, 'rgba(67, 97, 238, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fill();
}

// Draw Product Chart (Horizontal Bar Chart)
function drawProductChart() {
  if (!productChart) return;
  
  const ctx = productChart.getContext('2d');
  const width = productChart.width;
  const height = productChart.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Data
  const products = ['Premium Headphones', 'Smart Watch', 'Ergonomic Chair', 'Wireless Mouse', 'Bluetooth Speaker'];
  const revenueData = [12500, 9800, 7500, 6200, 4800];
  
  // Chart dimensions
  const chartWidth = width - 150;
  const chartHeight = height - 60;
  const barHeight = chartHeight / products.length / 2;
  const barSpacing = barHeight;
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(140, 20);
  ctx.lineTo(140, height - 40);
  ctx.lineTo(width - 20, height - 40);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw bars
  for (let i = 0; i < products.length; i++) {
    const y = 20 + (i * (barHeight + barSpacing));
    const barWidth = (revenueData[i] / 15000) * chartWidth;
    
    // Draw product label
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(products[i], 130, y + barHeight / 2 + 4);
    
    // Draw bar
    const gradient = ctx.createLinearGradient(140, 0, 140 + barWidth, 0);
    gradient.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--primary'));
    gradient.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--primary-light'));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(140, y, barWidth, barHeight);
    
    // Draw value label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`$${revenueData[i].toLocaleString()}`, 140 + barWidth - 10, y + barHeight / 2 + 3);
  }
}

// Draw Acquisition Chart (Line Chart)
function drawAcquisitionChart() {
  if (!acquisitionChart) return;
  
  const ctx = acquisitionChart.getContext('2d');
  const width = acquisitionChart.width;
  const height = acquisitionChart.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const newCustomers = [120, 150, 180, 220, 250, 280];
  const returningCustomers = [200, 220, 240, 280, 320, 350];
  
  // Chart dimensions
  const chartWidth = width - 60;
  const chartHeight = height - 60;
  const pointSpacing = chartWidth / (months.length - 1);
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(40, 20);
  ctx.lineTo(40, height - 40);
  ctx.lineTo(width - 20, height - 40);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw month labels
  for (let i = 0; i < months.length; i++) {
    const x = 40 + (i * pointSpacing);
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(months[i], x, height - 25);
  }
  
  // Draw new customers line
  ctx.beginPath();
  
  for (let i = 0; i < months.length; i++) {
    const x = 40 + (i * pointSpacing);
    const y = height - 40 - (newCustomers[i] / 400 * chartHeight);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw returning customers line
  ctx.beginPath();
  
  for (let i = 0; i < months.length; i++) {
    const x = 40 + (i * pointSpacing);
    const y = height - 40 - (returningCustomers[i] / 400 * chartHeight);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw legend
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  ctx.fillRect(width - 150, 20, 10, 10);
  
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
  ctx.fillRect(width - 150, 40, 10, 10);
  
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
  ctx.font = '10px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('New Customers', width - 130, 30);
  ctx.fillText('Returning Customers', width - 130, 50);
}

// Settings Tabs
settingsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and panels
    settingsTabs.forEach(t => t.classList.remove('active'));
    settingsPanels.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Show the corresponding panel
    const panelToShow = tab.getAttribute('data-tab');
    document.querySelector(`.${panelToShow}-panel`).classList.add('active');
  });
});

// User Card Flip
userCards.forEach(card => {
  card.addEventListener('click', () => {
    card.querySelector('.user-card-inner').style.transform = 'rotateY(180deg)';
  });
});

// Order Tile Flip
orderTiles.forEach(tile => {
  tile.addEventListener('click', () => {
    tile.querySelector('.order-tile-inner').style.transform = 'rotateY(180deg)';
  });
});

// Toast Notification Function
function showToast(title, message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  toast.innerHTML = `
    <div class="toast-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : 
          type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line>' : 
          type === 'warning' ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line>' : 
          '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line>'}
      </svg>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Add close event listener
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

// Initialize Dashboard
function initDashboard() {
  // Show dashboard section by default
  rotateCube('dashboard');
  
  // Animate stat values
  animateStatValues();
  
  // Draw charts
  drawStatCharts();
  drawSalesChart();
  drawTrafficChart();
  drawRevenueChart();
  drawProductChart();
  drawAcquisitionChart();
  
  // Show welcome toast
  setTimeout(() => {
    showToast('Welcome Back!', 'Your dashboard is ready', 'success');
  }, 1000);
}

// Run initialization
document.addEventListener('DOMContentLoaded', initDashboard);

// Window resize event to redraw charts
window.addEventListener('resize', () => {
  drawStatCharts();
  drawSalesChart();
  drawTrafficChart();
  drawRevenueChart();
  drawProductChart();
  drawAcquisitionChart();
});
