class ProgressBarModule

    ###*
    # @property {String} Path of a progress bar module application.
    # @private
    ###
    path: null

    ###*
    # @property {HTMLElement} HTML container for progress bar.
    # @private
    ###
    container: null

    ###*
    # @property {Object} Default options of ProgressBarModule.constructor method.
    # @private
    ###
    options:
        websocket: {}
        type: 'bootstrap'
        bootstrap:
            label:
                visible: true
                position: 'bottom' # 'top'
            progressbar:
                context: 'info' # 'success', 'warning', 'danger'
                stripped: true,
                animated: true,
            progression:
                visible: true,
                text_format: '{percent}%'
        html5:
            label:
                visible: true
                position: 'bottom' # 'top'
            progression:
                visible: true
                position: 'right'
                text_format: '{percent}%'

    ###*
    # Initialize a new ProgressBarModule object with given parameters.
    #
    # @constructs
    # @param {String} path - Path of a progress bar module application
    # @param {HTMLElement} container - HTML container for progress bar
    # @param {Object}  options - Object options
    # @param {Object}  options.websocket - Same options than `TornadoWebSocket` constructor
    # @param {String}  options.type - Type of the progress bar, `html5` or `bootstrap` by default
    # @param {Object}  options.bootstrap - Options to use when `type` is `bootstrap`
    # @param {Object}  options.bootstrap.label - Options for `label`'s behavior
    # @param {Boolean} options.bootstrap.label.visible - Switch on/off label's visibility, `true` by default
    # @param {String}  options.bootstrap.label.position - Label's position `top` or `bottom` by default
    # @param {Object}  options.bootstrap.progressbar - Options for `progressbar`'s behavior
    # @param {Boolean} options.bootstrap.progressbar.context - Switch on/off label's visibility, `true` by default
    # @param {Object}  options.html5 - configuration when `type` is `html5`
    # @example
    # var $container = document.querySelector('#container');
    # var progress = new ProgressBarModule('/my_progressbar', $container, {
    #     websocket: {
    #         host: 'my_host.com'
    #     },
    #     bootstrap: {
    #         progressbar: {
    #             animated: false,
    #         },
    #     },
    #     progression: {
    #         text_format: 'Progression: {percent}%'
    #     }
    # });
    ###
    constructor: (path, container, options) ->
        if this not instanceof ProgressBarModule
            return new ProgressBarModule path, container, options

        if path is undefined
            throw new Error "You must pass 'path' parameter during 'ProgressBarModule' instantiation."

        if container is undefined or container not instanceof HTMLElement
            throw new Error "You must pass an HTML element as container during `ProgressBarModule` instantiation."

        @path = path
        @container = container
        @options = Object.assign {}, @options, options

        if @options.type not in ['bootstrap', 'html5']
            throw new Error('Given `type` should be equal to ``bootstrap`` or ``html5``.')

        @render()

    ###*
    # A method
    # @memberof ProgressBarModule
    ###
    render: ->
        if @options.type is 'bootstrap'
            console.log('bootstrap')
            return

        if @options.type is 'html5'
            console.log('html5')
            return
