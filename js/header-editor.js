// Header Editor - Live drag-and-drop editor for header elements
class HeaderEditor {
    constructor() {
        this.editMode = false;
        this.draggedElement = null;
        this.offset = { x: 0, y: 0 };
        this.positionChanges = {};
        this.originalPositions = {};
        
        this.init();
    }
    
    init() {
        // Setup keyboard shortcut (Ctrl+E or Cmd+E)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.toggleEditMode();
            }
            // Escape to exit edit mode
            if (e.key === 'Escape' && this.editMode) {
                this.exitEditMode();
            }
        });
        
        // Setup toggle button
        const toggleBtn = document.getElementById('edit-mode-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleEditMode());
            // Show toggle button
            toggleBtn.classList.remove('hidden');
        }
        
        // Setup exit button
        const exitBtn = document.getElementById('exit-edit-btn');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => this.exitEditMode());
        }
        
        // Setup save & push button
        const saveBtn = document.getElementById('save-push-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveAndPush());
        }
        
        // Store original positions
        this.storeOriginalPositions();
    }
    
    storeOriginalPositions() {
        const logoSection = document.getElementById('logo-section');
        const buttonsSection = document.getElementById('buttons-section');
        
        if (logoSection) {
            const rect = logoSection.getBoundingClientRect();
            const navRect = logoSection.closest('nav')?.getBoundingClientRect() || { left: 0, top: 0 };
            this.originalPositions['logo-section'] = {
                left: rect.left - navRect.left,
                top: rect.top - navRect.top,
                position: getComputedStyle(logoSection).position
            };
        }
        
        if (buttonsSection) {
            const rect = buttonsSection.getBoundingClientRect();
            const navRect = buttonsSection.closest('nav')?.getBoundingClientRect() || { right: 0, top: 0 };
            const navWidth = buttonsSection.closest('nav')?.offsetWidth || window.innerWidth;
            this.originalPositions['buttons-section'] = {
                right: navWidth - (rect.right - navRect.left),
                top: rect.top - navRect.top,
                position: getComputedStyle(buttonsSection).position
            };
        }
    }
    
    toggleEditMode() {
        if (this.editMode) {
            this.exitEditMode();
        } else {
            this.enterEditMode();
        }
    }
    
    enterEditMode() {
        this.editMode = true;
        document.body.classList.add('edit-mode-active');
        
        // Show overlay
        const overlay = document.getElementById('edit-mode-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
        
        // Make elements draggable
        this.makeElementsDraggable();
        
        this.updateStatus('Edit mode active - Drag elements to reposition');
    }
    
    exitEditMode() {
        this.editMode = false;
        document.body.classList.remove('edit-mode-active');
        
        // Hide overlay
        const overlay = document.getElementById('edit-mode-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
        
        // Remove draggable functionality
        this.removeDraggable();
        
        this.updateStatus('');
    }
    
    makeElementsDraggable() {
        const editableElements = document.querySelectorAll('[data-editable]');
        
        editableElements.forEach(element => {
            // Add visual indicator
            element.style.cursor = 'move';
            element.style.outline = '2px dashed #3b82f6';
            element.style.outlineOffset = '2px';
            
            // Make position absolute for dragging
            const currentPosition = getComputedStyle(element).position;
            if (currentPosition === 'static' || currentPosition === 'relative') {
                element.dataset.originalPosition = currentPosition;
                element.style.position = 'absolute';
            }
            
            // Get current position
            const rect = element.getBoundingClientRect();
            const parentRect = element.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };
            
            if (element.id === 'logo-section') {
                element.style.left = (rect.left - parentRect.left) + 'px';
                element.style.top = (rect.top - parentRect.top) + 'px';
            } else if (element.id === 'buttons-section') {
                const parentWidth = element.offsetParent?.offsetWidth || window.innerWidth;
                element.style.right = (parentWidth - (rect.right - parentRect.left)) + 'px';
                element.style.top = (rect.top - parentRect.top) + 'px';
            }
            
            // Add drag listeners
            element.addEventListener('mousedown', this.startDrag.bind(this));
        });
    }
    
    removeDraggable() {
        const editableElements = document.querySelectorAll('[data-editable]');
        
        editableElements.forEach(element => {
            element.style.cursor = '';
            element.style.outline = '';
            element.style.outlineOffset = '';
            
            // Restore original position if not saved
            if (element.dataset.originalPosition) {
                element.style.position = element.dataset.originalPosition;
                delete element.dataset.originalPosition;
            }
            
            // Remove drag listeners
            element.removeEventListener('mousedown', this.startDrag.bind(this));
        });
    }
    
    startDrag(e) {
        if (!this.editMode) return;
        
        this.draggedElement = e.currentTarget;
        const rect = this.draggedElement.getBoundingClientRect();
        const parentRect = this.draggedElement.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };
        
        this.offset.x = e.clientX - rect.left;
        this.offset.y = e.clientY - rect.top;
        
        this.draggedElement.style.opacity = '0.8';
        this.draggedElement.style.zIndex = '10000';
        
        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.stopDrag);
        
        e.preventDefault();
        e.stopPropagation();
    }
    
    drag = (e) => {
        if (!this.draggedElement) return;
        
        const parentRect = this.draggedElement.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };
        const parentWidth = this.draggedElement.offsetParent?.offsetWidth || window.innerWidth;
        const parentHeight = this.draggedElement.offsetParent?.offsetHeight || window.innerHeight;
        
        let left = e.clientX - parentRect.left - this.offset.x;
        let top = e.clientY - parentRect.top - this.offset.y;
        
        // Keep within bounds
        left = Math.max(0, Math.min(left, parentWidth - this.draggedElement.offsetWidth));
        top = Math.max(0, Math.min(top, parentHeight - this.draggedElement.offsetHeight));
        
        if (this.draggedElement.id === 'logo-section') {
            this.draggedElement.style.left = left + 'px';
            this.draggedElement.style.top = top + 'px';
            this.draggedElement.style.right = 'auto';
        } else if (this.draggedElement.id === 'buttons-section') {
            const right = parentWidth - (left + this.draggedElement.offsetWidth);
            this.draggedElement.style.right = right + 'px';
            this.draggedElement.style.top = top + 'px';
            this.draggedElement.style.left = 'auto';
        }
    }
    
    stopDrag = () => {
        if (!this.draggedElement) return;
        
        this.draggedElement.style.opacity = '';
        this.draggedElement.style.zIndex = '';
        
        // Store position change
        const elementId = this.draggedElement.id;
        if (elementId === 'logo-section') {
            this.positionChanges[elementId] = {
                left: parseInt(this.draggedElement.style.left) || 0,
                top: parseInt(this.draggedElement.style.top) || 0,
                position: 'absolute'
            };
        } else if (elementId === 'buttons-section') {
            this.positionChanges[elementId] = {
                right: parseInt(this.draggedElement.style.right) || 0,
                top: parseInt(this.draggedElement.style.top) || 0,
                position: 'absolute'
            };
        }
        
        this.draggedElement = null;
        document.removeEventListener('mousemove', this.drag);
        document.removeEventListener('mouseup', this.stopDrag);
        
        this.updateStatus('Position updated - Click \"Save & Push\" to commit changes');
    }
    
    async saveAndPush() {
        // This script relies on github-api.js in your original setup
        // (keeping as-is; can be wired to this repo later).
        this.updateStatus('Save & Push via this overlay is not configured for this repo yet.', 'warning');
    }
    
    updateStatus(message, type = 'info') {
        const statusEl = document.getElementById('edit-status');
        if (statusEl) {
            statusEl.textContent = message;
            const colors = {
                info: 'text-gray-500',
                success: 'text-green-600',
                error: 'text-red-600',
                warning: 'text-yellow-600'
            };
            statusEl.className = `mt-3 text-sm ${colors[type] || colors.info}`;
        }
    }
}

// Initialize header editor when DOM is ready
let headerEditor;
document.addEventListener('DOMContentLoaded', () => {
    headerEditor = new HeaderEditor();
    window.headerEditor = headerEditor;
});

