
class ProgressBarModuleEngineBootstrap extends ProgressBarModuleEngineInterface

    ###*
    # Bootstrap engine for {@link ProgressBarModule} that implements {@link ProgressBarModuleEngineInterface}.
    # @constructs
    # @extends ProgressBarModuleEngineInterface
    ###
    constructor: (@container, @options) ->
        @_settings = {}

    ###*
    # @memberof ProgressBarModuleEngineBootstrap
    # @see ProgressBarModuleEngineInterface#render
    ###
    render: ->
        @_createElements()
        @_renderElements()

        return

    ###*
    # @memberof ProgressBarModuleEngineBootstrap
    # @see ProgressBarModuleEngineInterface#onInit
    ###
    onInit: (data) ->
        console.log 'onInit', data

        min = 0
        max = 100
        value = 100

        if data.indeterminate is false
            {min: min, max: max, value: value} = data
            @updateProgression 0

        @_config 'indeterminate', data.indeterminate
        @_config 'min', min
        @_config 'max', max
        @_config 'value', value

        return

    ###*
    # @memberof ProgressBarModuleEngineBootstrap
    # @see ProgressBarModuleEngineInterface#onUpdate
    ###
    onUpdate: (data) ->
        @_config 'value', data.value
        @_config 'progression', ((@_settings.value / @_settings.max) * 100).toFixed()

        @$progressbar.style.width = @_settings.progression + '%'
        @updateLabel data.label if data.label isnt undefined
        @updateProgression @_settings.progression

        return

    updateLabel: (msg) ->
        @$label.textContent = msg

        return

    updateProgression: (progression) ->
        @$progression.textContent = @options.progression.format.replace /\{\{ *percent *\}\}/g, progression

        return

    ###*
    # Create HTML elements.
    # @memberof ProgressBarModuleEngineBootStrap
    # @private
    ###
    _createElements: ->
        # Progress wrapper
        @$progress = document.createElement 'div'
        @$progress.classList.add 'progress'

        # Progress bar
        @$progressbar = document.createElement 'div'
        @$progressbar.classList.add 'progress-bar'
        @$progressbar.setAttribute 'role', 'progressbar'

        if @options.progressbar.context in ['info', 'success', 'warning', 'danger']
            @$progressbar.classList.add 'progress-bar-' + @options.progressbar.context

        @$progressbar.classList.add 'progress-bar-striped' if @options.progressbar.striped is true
        @$progressbar.classList.add 'active' if @options.progressbar.animated is true

        # Progression (text in progress bar)
        @$progression = document.createElement 'span'
        @$progression.classList.add 'sr-only' if @options.progression.visible is false

        # Label
        @$label = document.createElement 'span'
        @$label.classList.add __ for __ in @options.label.classes
        @$label.style.display = 'none' if @options.label.visibility is false

        return

    ###*
    # Render HTML elements.
    # @memberof ProgressBarModuleEngineBootStrap
    # @private
    ###
    _renderElements: ->
        @$progressbar.appendChild @$progression
        @$progress.appendChild @$progressbar
        @container.appendChild @$progress

        if @options.label.position is 'top'
            @container.insertBefore @$label, @$progress
        else
            @container.appendChild @$label

        return

    ###*
    # Configure progress bar with key/value combination.
    # @private
    ###
    _config: (key, value) ->
        @_settings[key] = value

        switch key
            when 'min', 'max', 'value'
                @$progressbar.setAttribute 'aria-value' + key, value
            when 'indeterminate'
                if value is true
                    @$progressbar.classList.add 'progress-bar-striped'
                    @$progressbar.classList.add 'active'
                    @$progressbar.style.width = '100%'
