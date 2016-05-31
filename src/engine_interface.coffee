class ProgressBarModuleEngineInterface
    
    ###*
    # Interface for classes that represent a {@link ProgressBarModule#engine}.
    # @interface
    # @constructs
    ###
    constructor: -> throw new Error '`ProgressBarModuleEngineInterface` should be implemented as an interface.'

    ###*
    # Make and display an HTML render to the user.
    # @memberof ProgressBarModuleEngineInterface
    ###
    render: -> throw new Error '`render` method should be overridden.'

    ###*
    # Called when receive `init` progress bar's websocket event.
    # @memberof ProgressBarModuleEngineInterface
    # @param {Object} data - Data sent by the server.
    ###
    onInit: (data) -> throw new Error '`onInit` method should be overridden.'

    ###*
    # Called when receive `update` progress bar's websocket event.
    # @memberof ProgressBarModuleEngineInterface
    # @param {Object} data - Data sent by the server.
    ###
    onUpdate: (data) -> throw new Error '`onUpdate` method should be overridden.'

    ###*
    # Update label.
    # @memberof ProgressBarModuleEngineInterface
    # @param {String} label - Label to display.
    ###
    updateLabel: (label) -> throw new Error '`updateLabel` method should be overridden.'

    ###*
    # Update progression.
    # @memberof ProgressBarModuleEngineInterface
    # @param {Number} progression - Progression to display.
    ###
    updateProgression: (progression) -> throw new Error '`updateProgression` method should be overridden.'

