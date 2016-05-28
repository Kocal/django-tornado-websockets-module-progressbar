class ProgressBarModule

    ###*
    # Initialize a new ProgressBarModule object with given parameters.
    #
    # @constructs
    # @param {String} path - Path of a progress bar module application
    # @param {HTMLElement} container - HTML container for progress bar
    # @param {Object}  options - Object options
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

        ###*
        # @property {String} path - Path of a progress bar module application.
        # @private
        ###
        @path = path

        @container = container

        ###*
        # @prop {Object}  options - Default options overridden during {@link ProgressBarModule} instantiation
        # @prop {Object}  options.websocket - Same options than `TornadoWebSocket` constructor
        # @prop {String}  options.type - Type of the progress bar, `html5` or `bootstrap` by default
        # @prop {Object}  options.bootstrap - Options to use when `type` is `bootstrap`
        # @prop {Object}  options.bootstrap.label - Options for `label`'s behavior
        # @prop {Boolean} options.bootstrap.label.visible - Switch on/off label's visibility, `true` by default
        # @prop {String}  options.bootstrap.label.position - Label's position `top` or `bottom` by default
        # @prop {Object}  options.bootstrap.progressbar - Options for `progressbar`'s behavior
        # @prop {Boolean} options.bootstrap.progressbar.context - Switch on/off label's visibility, `true` by default
        # @prop {Object}  options.html5 - configuration when `type` is `html5`
        # @private
        ###
        @options =
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
