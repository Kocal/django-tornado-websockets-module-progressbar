var ProgressBarModule;

ProgressBarModule = (function() {

    /**
     * Initialize a new ProgressBarModule object with given parameters.
     * @param {String}       path               Path of a progress bar module application
     * @param {HTMLElement}  container          HTML container for progress bar
     * @param {Object}       options            Object options
     * @param {Object}       options.websocket  Same options than ``TornadoWebSocket`` constructor
     * @param {String}       options.type       Type of the progress bar, ``html5`` or 'bootstrap' by default
     * @param {String}       options.bootstrap  Configuration for
     */
    function ProgressBarModule(path, container, options) {
        var ref;
        if (!(this instanceof ProgressBarModule)) {
            return new ProgressBarModule(path, container, options);
        }
        if (path === void 0) {
            throw new Error("You must pass 'path' parameter during 'ProgressBarModule' instantiation.");
        }
        if (container === void 0 || !(container instanceof HTMLElement)) {
            throw new Error("You must pass an HTML element as container during `ProgressBarModule` instantiation.");
        }

        /**
         * Path of a progress bar module application.
         * @type {String}
         * @private
         */
        this.path = path;

        /**
         * HTML container for progress bar
         * @type {HTMLElement}
         * @private
         */
        this.container = container;

        /**
         * Configuration values
         * @type {Object}
         * @private
         */
        this.options = {
            websocket: {},
            type: 'bootstrap',
            bootstrap: {
                label: {
                    visible: true,
                    position: 'bottom'
                },
                progressbar: {
                    context: 'info',
                    stripped: true,
                    animated: true
                },
                progression: {
                    visible: true,
                    text_format: '{percent}%'
                }
            },
            html5: {
                label: {
                    visible: true,
                    position: 'bottom'
                },
                progression: {
                    visible: true,
                    position: 'right',
                    text_format: '{percent}%'
                }
            }
        };
        this.options = Object.assign({}, this.options, options);
        if ((ref = this.options.type) !== 'bootstrap' && ref !== 'html5') {
            throw new Error('Given `type` should be equal to ``bootstrap`` or ``html5``.');
        }
        this.render();
    }

    ProgressBarModule.prototype.render = function() {
        if (this.options.type === 'bootstrap') {
            console.log('bootstrap');
            return;
        }
        if (this.options.type === 'html5') {
            console.log('html5');
        }
    };

    return ProgressBarModule;

})();