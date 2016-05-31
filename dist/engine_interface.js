var ProgressBarModuleEngineInterface;

ProgressBarModuleEngineInterface = (function() {

  /**
   * Interface for classes that represent a {@link ProgressBarModule#engine}.
   * @interface
   * @constructs
   */
  function ProgressBarModuleEngineInterface() {
    throw new Error('`ProgressBarModuleEngineInterface` should be implemented as an interface.');
  }


  /**
   * Make and display an HTML render to the user.
   * @memberof ProgressBarModuleEngineInterface
   */

  ProgressBarModuleEngineInterface.prototype.render = function() {
    throw new Error('`render` method should be overridden.');
  };


  /**
   * Called when receive `init` progress bar's websocket event.
   * @memberof ProgressBarModuleEngineInterface
   * @param {Object} data - Data sent by the server.
   */

  ProgressBarModuleEngineInterface.prototype.onInit = function(data) {
    throw new Error('`onInit` method should be overridden.');
  };


  /**
   * Called when receive `update` progress bar's websocket event.
   * @memberof ProgressBarModuleEngineInterface
   * @param {Object} data - Data sent by the server.
   */

  ProgressBarModuleEngineInterface.prototype.onUpdate = function(data) {
    throw new Error('`onUpdate` method should be overridden.');
  };


  /**
   * Update label.
   * @memberof ProgressBarModuleEngineInterface
   * @param {String} label - Label to display.
   */

  ProgressBarModuleEngineInterface.prototype.updateLabel = function(label) {
    throw new Error('`updateLabel` method should be overridden.');
  };


  /**
   * Update progression.
   * @memberof ProgressBarModuleEngineInterface
   * @param {Number} progression - Progression to display.
   */

  ProgressBarModuleEngineInterface.prototype.updateProgression = function(progression) {
    throw new Error('`updateProgression` method should be overridden.');
  };

  return ProgressBarModuleEngineInterface;

})();
