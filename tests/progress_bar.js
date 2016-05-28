/**
 * Created by kocal on 26/05/16.
 */

describe('`ProgressBarModule`', function () {
    it('should be defined', function () {
        expect(ProgressBarModule).toBeDefined();
    });
});

describe('`ProgressBarModule` instances', function () {

    it('should be a `ProgressBarModule` instance', function () {
        var progress = new ProgressBarModule('foo', document.body);

        expect(progress instanceof ProgressBarModule).toBeTruthy()
    });

    it('should force a `ProgressBarModule` instance', function () {
        var progress = ProgressBarModule('foo', document.body);

        expect(progress instanceof ProgressBarModule).toBeTruthy()
    });

});

describe('`ProgressBarModule(path, container, options)`', function () {

    it('should throw an Error when there is no path', function () {
        expect(function () {
            return new ProgressBarModule();
        }).toThrowError("You must pass 'path' parameter during 'ProgressBarModule' instantiation.");
    });

    it('should throw an Error when there is no container', function () {
        expect(function () {
            return new ProgressBarModule('foo')
        }).toThrowError('You must pass an HTML element as container during `ProgressBarModule` instantiation.');
    });

    it('should throw an Error when there is a container but not a valid HTMLElement.', function () {
        expect(function () {
            return new ProgressBarModule('foo', 'not an HTMLElement')
        }).toThrowError('You must pass an HTML element as container during `ProgressBarModule` instantiation.');
    });

    it('should not throw any Error', function () {
        expect(function () {
            ProgressBarModule('foot', document.body)
        }).not.toThrowError();
    });

});

describe('`ProgressBarModule::render()`', function () {

    beforeEach(function () {
        var fixture = '<div id="fixture"><div id="progress-bar__container"></div></div>';

        document.body.insertAdjacentHTML('afterbegin', fixture)
    });

    afterEach(function () {
        document.body.removeChild(document.querySelector('#fixture'));
    });

});
