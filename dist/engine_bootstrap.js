var ProgressBarModuleEngineBootstrap,
  extend = function(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  },
  hasProp = {}.hasOwnProperty;

ProgressBarModuleEngineBootstrap = (function(superClass) {
  extend(ProgressBarModuleEngineBootstrap, superClass);


  /**
   * Bootstrap engine for {@link ProgressBarModule} that implements {@link ProgressBarModuleEngineInterface}.
   * @constructs
   * @extends ProgressBarModuleEngineInterface
   */

  function ProgressBarModuleEngineBootstrap(container, options) {
    this.container = container;
    this.options = options;
    this._settings = {};
  }


  /**
   * @memberof ProgressBarModuleEngineBootstrap
   * @see ProgressBarModuleEngineInterface#render
   */

  ProgressBarModuleEngineBootstrap.prototype.render = function() {
    this._createElements();
    this._renderElements();
  };


  /**
   * @memberof ProgressBarModuleEngineBootstrap
   * @see ProgressBarModuleEngineInterface#onInit
   */

  ProgressBarModuleEngineBootstrap.prototype.onInit = function(data) {
    var max, min, value;
    console.log('onInit', data);
    min = 0;
    max = 100;
    value = 100;
    if (data.indeterminate === false) {
      min = data.min, max = data.max, value = data.value;
      this.updateProgression(0);
    }
    this._config('indeterminate', data.indeterminate);
    this._config('min', min);
    this._config('max', max);
    this._config('value', value);
  };


  /**
   * @memberof ProgressBarModuleEngineBootstrap
   * @see ProgressBarModuleEngineInterface#onUpdate
   */

  ProgressBarModuleEngineBootstrap.prototype.onUpdate = function(data) {
    this._config('value', data.value);
    this._config('progression', ((this._settings.value / this._settings.max) * 100).toFixed());
    this.$progressbar.style.width = this._settings.progression + '%';
    if (data.label !== void 0) {
      this.updateLabel(data.label);
    }
    this.updateProgression(this._settings.progression);
  };

  ProgressBarModuleEngineBootstrap.prototype.updateLabel = function(msg) {
    this.$label.textContent = msg;
  };

  ProgressBarModuleEngineBootstrap.prototype.updateProgression = function(progression) {
    this.$progression.textContent = this.options.progression.format.replace(/\{\{ *percent *\}\}/g, progression);
  };


  /**
   * Create HTML elements.
   * @memberof ProgressBarModuleEngineBootStrap
   * @private
   */

  ProgressBarModuleEngineBootstrap.prototype._createElements = function() {
    var __, i, len, ref, ref1;
    this.$progress = document.createElement('div');
    this.$progress.classList.add('progress');
    this.$progressbar = document.createElement('div');
    this.$progressbar.classList.add('progress-bar');
    this.$progressbar.setAttribute('role', 'progressbar');
    if ((ref = this.options.progressbar.context) === 'info' || ref === 'success' || ref === 'warning' || ref === 'danger') {
      this.$progressbar.classList.add('progress-bar-' + this.options.progressbar.context);
    }
    if (this.options.progressbar.striped === true) {
      this.$progressbar.classList.add('progress-bar-striped');
    }
    if (this.options.progressbar.animated === true) {
      this.$progressbar.classList.add('active');
    }
    this.$progression = document.createElement('span');
    if (this.options.progression.visible === false) {
      this.$progression.classList.add('sr-only');
    }
    this.$label = document.createElement('span');
    ref1 = this.options.label.classes;
    for (i = 0, len = ref1.length; i < len; i++) {
      __ = ref1[i];
      this.$label.classList.add(__);
    }
    if (this.options.label.visibility === false) {
      this.$label.style.display = 'none';
    }
  };


  /**
   * Render HTML elements.
   * @memberof ProgressBarModuleEngineBootStrap
   * @private
   */

  ProgressBarModuleEngineBootstrap.prototype._renderElements = function() {
    this.$progressbar.appendChild(this.$progression);
    this.$progress.appendChild(this.$progressbar);
    this.container.appendChild(this.$progress);
    if (this.options.label.position === 'top') {
      this.container.insertBefore(this.$label, this.$progress);
    } else {
      this.container.appendChild(this.$label);
    }
  };


  /**
   * Configure progress bar with key/value combination.
   * @private
   */

  ProgressBarModuleEngineBootstrap.prototype._config = function(key, value) {
    this._settings[key] = value;
    switch (key) {
      case 'min':
      case 'max':
      case 'value':
        return this.$progressbar.setAttribute('aria-value' + key, value);
      case 'indeterminate':
        if (value === true) {
          this.$progressbar.classList.add('progress-bar-striped');
          this.$progressbar.classList.add('active');
          return this.$progressbar.style.width = '100%';
        }
    }
  };

  return ProgressBarModuleEngineBootstrap;

})(ProgressBarModuleEngineInterface);
