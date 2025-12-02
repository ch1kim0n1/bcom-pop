/**
 * CHARTS.JS - Interactive Data Visualization with Chart.js
 * Data Dashboard for Portfolio by Vladislav Kondratyev
 * 
 * ============================================
 * HOW TO UPDATE YOUR DATA:
 * ============================================
 * 1. Find the DATA CONFIGURATION section below
 * 2. Update the 'labels' array with your years
 * 3. Update the 'data' arrays with your actual numbers
 * 4. Save and refresh the page
 * ============================================
 */

// ============================================
// DATA CONFIGURATION - UPDATE YOUR NUMBERS HERE
// ============================================

const chartData = {
  // Years to display on X-axis
  labels: ['2021', '2022', '2023', '2024', '2025'],
  
  // Commits per year - UPDATE THESE WITH YOUR REAL DATA
  commits: [150, 320, 580, 720, 890],
  
  // Projects started per year - UPDATE THESE WITH YOUR REAL DATA
  projects: [3, 7, 12, 8, 5],
  
  // Languages used per year - UPDATE THESE WITH YOUR REAL DATA
  languages: [2, 4, 6, 8, 9]
};

// ============================================
// CHART STYLING - Terminal Theme Colors
// ============================================

const chartColors = {
  accent: '#00ff9c',
  accentTransparent: 'rgba(0, 255, 156, 0.2)',
  accentBorder: 'rgba(0, 255, 156, 0.8)',
  secondary: '#00d4ff',
  secondaryTransparent: 'rgba(0, 212, 255, 0.2)',
  tertiary: '#ff6b9d',
  tertiaryTransparent: 'rgba(255, 107, 157, 0.2)',
  text: '#e0e0e0',
  textMuted: '#888888',
  gridLines: 'rgba(255, 255, 255, 0.1)',
  background: '#1a1a1a'
};

// Common chart options for consistent styling
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(26, 26, 26, 0.95)',
      titleColor: chartColors.accent,
      bodyColor: chartColors.text,
      borderColor: chartColors.accent,
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      titleFont: {
        family: "'Fira Code', monospace",
        size: 14,
        weight: '600'
      },
      bodyFont: {
        family: "'Fira Code', monospace",
        size: 12
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: chartColors.gridLines,
        drawBorder: false
      },
      ticks: {
        color: chartColors.text,
        font: {
          family: "'Fira Code', monospace",
          size: 12
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: chartColors.gridLines,
        drawBorder: false
      },
      ticks: {
        color: chartColors.text,
        font: {
          family: "'Fira Code', monospace",
          size: 12
        }
      }
    }
  }
};

// ============================================
// CHART INITIALIZATION
// ============================================

function initCharts() {
  initCommitsChart();
  initProjectsChart();
  initLanguagesChart();
}

// ============================================
// COMMITS CHART - Line Chart with Trend Line
// ============================================

function initCommitsChart() {
  const ctx = document.getElementById('commitsChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Commits',
        data: chartData.commits,
        borderColor: chartColors.accent,
        backgroundColor: chartColors.accentTransparent,
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: chartColors.accent,
        pointBorderColor: chartColors.background,
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: chartColors.accent,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        tooltip: {
          ...commonOptions.plugins.tooltip,
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} commits`;
            }
          }
        }
      },
      scales: {
        ...commonOptions.scales,
        y: {
          ...commonOptions.scales.y,
          title: {
            display: true,
            text: 'Total Commits',
            color: chartColors.textMuted,
            font: {
              family: "'Fira Code', monospace",
              size: 11
            }
          }
        }
      }
    }
  });
}

// ============================================
// PROJECTS CHART - Bar Chart
// ============================================

function initProjectsChart() {
  const ctx = document.getElementById('projectsChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Projects Started',
        data: chartData.projects,
        backgroundColor: chartColors.secondaryTransparent,
        borderColor: chartColors.secondary,
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(0, 212, 255, 0.4)',
        hoverBorderColor: chartColors.secondary,
        hoverBorderWidth: 3
      }]
    },
    options: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        tooltip: {
          ...commonOptions.plugins.tooltip,
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} projects started`;
            }
          }
        }
      },
      scales: {
        ...commonOptions.scales,
        y: {
          ...commonOptions.scales.y,
          title: {
            display: true,
            text: 'Projects Started',
            color: chartColors.textMuted,
            font: {
              family: "'Fira Code', monospace",
              size: 11
            }
          }
        }
      }
    }
  });
}

// ============================================
// LANGUAGES CHART - Bar Chart (Changed from previous format)
// ============================================

function initLanguagesChart() {
  const ctx = document.getElementById('languagesChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Languages Used',
        data: chartData.languages,
        backgroundColor: chartColors.tertiaryTransparent,
        borderColor: chartColors.tertiary,
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(255, 107, 157, 0.4)',
        hoverBorderColor: chartColors.tertiary,
        hoverBorderWidth: 3
      }]
    },
    options: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        tooltip: {
          ...commonOptions.plugins.tooltip,
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} languages`;
            }
          }
        }
      },
      scales: {
        ...commonOptions.scales,
        y: {
          ...commonOptions.scales.y,
          title: {
            display: true,
            text: 'Languages Used',
            color: chartColors.textMuted,
            font: {
              family: "'Fira Code', monospace",
              size: 11
            }
          }
        }
      }
    }
  });
}

// ============================================
// INITIALIZATION ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Only initialize charts if we're on a page with chart canvases
  if (document.getElementById('commitsChart')) {
    initCharts();
    console.log('%c Charts initialized ', 'background: #00ff9c; color: #1a1a1a; font-family: monospace; padding: 5px;');
  }
});

