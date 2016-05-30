# Hack for JSDoc, otherwise, ProgressBarModuleEngineInterface will not be correctly documented because
# of CoffeeScript and JavaScript generation.
class ___a extends Window

###*
# Interface for classes that represent a {@link ProgressBarModule#engine}.
# @interface
# @class
###
class ProgressBarModuleEngineInterface
    constructor: -> throw new Error '`ProgressBarModuleEngineInterface` should be implemented as an interface.'

    render: -> throw new Error '`render` method should be overridden.'

    updateProgression: -> throw new Error '`updateProgression` method should be overridden.'

class ProgressBarModuleEngineBootstrap extends ProgressBarModuleEngineInterface

    ###*
    # Bootstrap engine for {@link ProgressBarModule} that implements {@link ProgressBarModuleEngineInterface}
    # @constructs
    ###
    constructor: ->

    render: ->
