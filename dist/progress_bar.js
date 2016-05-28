var ProgressBarModule;

ProgressBarModule = (function() {

    /**
     * @property {String} Path of a progress bar module application.
     * @private
     */
    ProgressBarModule.prototype.path = null;


    /**
     * @property {HTMLElement} HTML container for progress bar.
     * @private
     */

    ProgressBarModule.prototype.container = null;


    /**
     * @property {Object} Default options of ProgressBarModule.constructor method.
     * @private
     */

    ProgressBarModule.prototype.options = {
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


    /**
     * Initialize a new ProgressBarModule object with given parameters.
     *
     * @constructs
     * @param {String} path - Path of a progress bar module application
     * @param {HTMLElement} container - HTML container for progress bar
     * @param {Object}  options - Object options
     * @param {Object}  options.websocket - Same options than `TornadoWebSocket` constructor
     * @param {String}  options.type - Type of the progress bar, `html5` or `bootstrap` by default
     * @param {Object}  options.bootstrap - Options to use when `type` is `bootstrap`
     * @param {Object}  options.bootstrap.label - Options for `label`'s behavior
     * @param {Boolean} options.bootstrap.label.visible - Switch on/off label's visibility, `true` by default
     * @param {String}  options.bootstrap.label.position - Label's position `top` or `bottom` by default
     * @param {Object}  options.bootstrap.progressbar - Options for `progressbar`'s behavior
     * @param {Boolean} options.bootstrap.progressbar.context - Switch on/off label's visibility, `true` by default
     * @param {Object}  options.html5 - configuration when `type` is `html5`
     * @example
     * var $container = document.querySelector('#container');
     * var progress = new ProgressBarModule('/my_progressbar', $container, {
     *     websocket: {
     *         host: 'my_host.com'
     *     },
     *     bootstrap: {
     *         progressbar: {
     *             animated: false,
     *         },
     *     },
     *     progression: {
     *         text_format: 'Progression: {percent}%'
     *     }
     * });
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
        this.path = path;
        this.container = container;
        this.options = Object.assign({}, this.options, options);
        if ((ref = this.options.type) !== 'bootstrap' && ref !== 'html5') {
            throw new Error('Given `type` should be equal to ``bootstrap`` or ``html5``.');
        }
        this.render();
    }


    /**
     * A method
     * @memberof ProgressBarModule
     */

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