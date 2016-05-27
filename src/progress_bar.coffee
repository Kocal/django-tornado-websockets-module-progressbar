class ProgressBarModule

    ###*
    # Initialize a new ProgressBarModule object with given parameters.
    # @param {String}       path               Path of a progress bar module application
    # @param {HTMLElement}  container          HTML container for progress bar
    # @param {Object}       options            Object options
    # @param {Object}       options.websocket  Same options than ``TornadoWebSocket`` constructor
    # @param {String}       options.type       Type of the progress bar, ``html5`` or 'bootstrap' by default
    # @param {String}       options.bootstrap  Configuration for
    ###
    constructor: (path, container, options) ->
        if this not instanceof ProgressBarModule
            return new ProgressBarModule path, container, options

        if path is undefined
            throw new Error "You must pass 'path' parameter during 'ProgressBarModule' instantiation."

        if container is undefined or container not instanceof HTMLElement
            throw new Error "You must pass an HTML element as container during `ProgressBarModule` instantiation."

        ###*
        # Path of a progress bar module application.
        # @type {String}
        # @private
        ###
        @path = path

        ###*
        # HTML container for progress bar
        # @type {HTMLElement}
        # @private
        ###
        @container = container

        ###*
        # Configuration values
        # @type {Object}
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

    render: ->
        if @options.type is 'bootstrap'
            console.log('bootstrap')
            return

        if @options.type is 'html5'
            console.log('html5')
            return
