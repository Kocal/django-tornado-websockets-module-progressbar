describe("`ProgressBarModuleEngine`", function () {

    it("should be defined", function () {
        expect(ProgressBarModuleEngine).toBeDefined();
    });

    it("should not be instantiated", function () {

    });
});

describe("`ProgressBarModuleEngine::constructor($container, options)`", function () {

    it("should be instantiable", function () {
        new ProgressBarModuleEngine()
    });

});

describe("`ProgressBarModuleEngine` methods", function () {

    beforeEach(function () {
        myEngine = (function (superClass) {
                extend(myEngine, superClass);

            function myEngine(container, options) {
                myEngine.__super__.constructor.call(this, container, options);
                this._settings = {};
            }

                return myEngine;
            })(ProgressBarModuleEngine);
    });

    it("should be overridden", function () {
        expect(function () {
            new ProgressBarModuleEngine()
        }).toThrowError('`ProgressBarModuleEngine` should be implemented as an interface.')
    });

});
