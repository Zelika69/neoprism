// Funcionalidad de modo oscuro
class ThemeManager {
  constructor() {
    this.currentTheme = 'light'; // Inicializar tema por defecto
    this.init();
  }

  init() {
    // Cargar tema guardado o usar preferencia del sistema
    this.loadTheme();
    
    // Configurar event listeners
    this.setupEventListeners();
    
    // Observar cambios en la preferencia del sistema
    this.watchSystemTheme();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.setTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.currentTheme = 'dark';
      this.setTheme('dark');
    } else {
      this.currentTheme = 'light';
      this.setTheme('light');
    }
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setupEventListeners() {
    // Función para configurar el listener
    const setupToggleListener = () => {
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleTheme();
        });
        return true; // Botón encontrado
      } else {
        return false; // Botón no encontrado
      }
    };

    // Función para esperar a que aparezca el botón
    const waitForButton = () => {
      if (setupToggleListener()) {
        return; // Botón encontrado, salir
      }
      
      // Usar MutationObserver para detectar cuando se agrega el botón
       const observer = new MutationObserver((mutations) => {
         for (const mutation of mutations) {
           if (mutation.type === 'childList') {
             for (const node of mutation.addedNodes) {
               if (node.nodeType === Node.ELEMENT_NODE) {
                 const button = node.querySelector ? node.querySelector('#theme-toggle') : null;
                 if (button || node.id === 'theme-toggle') {
                   setupToggleListener();
                   observer.disconnect();
                   return;
                 }
               }
             }
           }
         }
       });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Timeout de seguridad
       setTimeout(() => {
         observer.disconnect();
       }, 5000);
    };

    // Esperar a que el DOM esté cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', waitForButton);
    } else {
      // DOM ya está cargado
      waitForButton();
    }
  }

  watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Solo cambiar si no hay tema guardado manualmente
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Inicializar el gestor de temas
const themeManager = new ThemeManager();

// Exportar para uso global
window.themeManager = themeManager;