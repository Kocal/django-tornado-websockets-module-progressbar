function initProgress($container, options) {
    return new ProgressBarModule('/', $container, {
        websocket: {
            host: 'kocal.fr'
        },
        type: 'bootstrap',
        bootstrap: options
    });
}

describe('`ProgressBarModuleEngineBootstrap::_createElements()`', function () {

    var $container;

    beforeEach(function () {
        $container = document.createElement('div');
        $container.setAttribute('id', 'container');
        document.body.appendChild($container);
    });

    afterEach(function () {
        document.body.removeChild($container);
    });

    it('by using default options.', function () {
        var progress = initProgress($container, {});
        var $progress = progress.engine.$progress;
        var $progressbar = progress.engine.$progressbar;
        var $progression = progress.engine.$progression;
        var $label = progress.engine.$label;

        // tests for $progress
        expect($progress).toEqual(jasmine.any(HTMLDivElement));
        expect($progress.classList).toContain('progress');

        // tests for $progressbar
        expect($progressbar).toEqual(jasmine.any(HTMLDivElement));
        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).toContain('progress-bar-info');
        expect($progressbar.getAttribute('role')).toEqual('progressbar');

        // tests for $progression
        expect($progression).toEqual(jasmine.any(HTMLSpanElement));
        expect($progression.classList).not.toContain('sr-only');

        // tests for $label
        expect($label).toEqual(jasmine.any(HTMLSpanElement));
        expect($label.classList).toContain('progressbar-label');
    });

    it('$label should be visible', function () {
        var progress = initProgress($container, {});
        var $label = progress.engine.$label;

        expect($label.style.display).not.toEqual('none');
    });

    it('$label should not be visible', function () {
        var progress = initProgress($container, { label: { visible: false } });
        var $label = progress.engine.$label;

        expect($label.style.display).toEqual('none');
    });

    it('$progressbar should be using `success` context', function () {
        var progress = initProgress($container, { progressbar: { context: 'success' } });
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).toContain('progress-bar-success');
    });


    it('$progressbar should be using `warning` context', function () {
        var progress = initProgress($container, { progressbar: { context: 'warning' } });
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).toContain('progress-bar-warning');
    });

    it('$progressbar should be using `danger` context', function () {
        var progress = initProgress($container, { progressbar: { context: 'danger' } });
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).toContain('progress-bar-danger');
    });

    it('$progressbar should not be using context if it is unknown', function () {
        var progress = initProgress($container, { progressbar: { context: 'not a context' } });
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).not.toContain('progress-bar-info');
        expect($progressbar.classList).not.toContain('progress-bar-success');
        expect($progressbar.classList).not.toContain('progress-bar-warning');
        expect($progressbar.classList).not.toContain('progress-bar-danger');
    });

    it('$progressbar should be striped', function () {
        var progress = initProgress($container, { progressbar: { striped: true } });
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).toContain('progress-bar-striped');
    });

    it('$progressbar should not be animated', function () {
        var progress = initProgress($container, { progressbar: { animated: true } });
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).not.toContain('progress-bar-striped');
        expect($progressbar.classList).not.toContain('active');
    });

    it('$progressbar should be animated', function () {
        var progress = initProgress($container, { progressbar: { striped: true, animated: true } });
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).toContain('progress-bar');
        expect($progressbar.classList).toContain('progress-bar-striped');
        expect($progressbar.classList).toContain('active');
    });

    it('$progression should be visible', function () {
        var progress = initProgress($container, {});
        var $progression = progress.engine.$progression;

        // screen-reader only
        expect($progression.classList).not.toContain('sr-only');
    });

    it('$progression should not be visible', function () {
        var progress = initProgress($container, { progression: { visible: false } });
        var $progression = progress.engine.$progression;

        expect($progression.classList).toContain('sr-only');
    });

});

describe('`ProgressBarModuleEngineBootstrap::_createElements()`', function () {

    var $container;

    beforeEach(function () {
        $container = document.createElement('div');
        $container.setAttribute('id', 'container');
        document.body.appendChild($container);
    });

    afterEach(function () {
        document.body.removeChild($container);
    });

    it('$label should be above to $progress', function () {
        var progress = initProgress($container, {});
        var $progress = progress.engine.$progress;
        var $label = progress.engine.$label;

        $label.textContent = 'Foo';
        expect(parseInt($label.offsetTop, 10)).toBeLessThan(parseInt($progress.offsetTop, 10));
    });

    it('$label should be below to $progress', function () {
        var progress = initProgress($container, { label: { position: 'bottom' } });
        var $progress = progress.engine.$progress;
        var $label = progress.engine.$label;

        $label.textContent = 'Bar';
        expect(parseInt($label.offsetTop, 10)).toBeGreaterThan(parseInt($progress.offsetTop, 10));
    });

});

describe('`ProgressBarModuleEngineBootstrap::_config(key, value)`', function () {

    var $container;

    beforeEach(function () {
        $container = document.createElement('div');
        $container.setAttribute('id', 'container');
        document.body.appendChild($container);
    });

    afterEach(function () {
        document.body.removeChild($container);
    });

    it('should set `aria-valuemin` value to $progressbar', function () {
        var progress = initProgress($container, {});
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.getAttribute('aria-valuemin')).toBeNull();

        progress.engine._config('min', 25);
        expect(parseInt($progressbar.getAttribute('aria-valuemin'), 10)).toEqual(25);
    });

    it('should set `aria-valuemmax` value to $progressbar', function () {
        var progress = initProgress($container, {});
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.getAttribute('aria-valuemax')).toBeNull();

        progress.engine._config('max', 2000);
        expect(parseInt($progressbar.getAttribute('aria-valuemax'), 10)).toEqual(2000);
    });

    it('should set `aria-valuenow` value to $progressbar', function () {
        var progress = initProgress($container, {});
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.getAttribute('aria-valuenow')).toBeNull();

        progress.engine._config('value', 500);
        expect(parseInt($progressbar.getAttribute('aria-valuenow'), 10)).toEqual(500);
    });

    it('should set $progressbar in `indeterminate` state', function () {
        var progress = initProgress($container, {});
        var $progressbar = progress.engine.$progressbar;

        expect($progressbar.classList).not.toContain('progress-bar-striped');
        expect($progressbar.classList).not.toContain('active');
        expect($progressbar.style.width).not.toEqual('100%');

        progress.engine._config('indeterminate', true);
        expect($progressbar.classList).toContain('progress-bar-striped');
        expect($progressbar.classList).toContain('active');
        expect($progressbar.style.width).toEqual('100%');
    });

});

describe('`ProgressBarModuleEngineBootstrap::updateLabel(msg)`', function () {

    var $container;

    beforeEach(function () {
        $container = document.createElement('div');
        $container.setAttribute('id', 'container');
        document.body.appendChild($container);
    });

    afterEach(function () {
        document.body.removeChild($container);
    });

    it('should update label...', function () {
        var progress = initProgress($container, {});
        var $label = progress.engine.$label;

        expect($label.textContent).toEqual('');
        progress.engine.updateLabel('Message');
        expect($label.textContent).toEqual('Message');
    });
});

describe('`ProgressBarModuleEngineBootstrap::updateLable(msg)`', function () {

    var $container;

    beforeEach(function () {
        $container = document.createElement('div');
        $container.setAttribute('id', 'container');
        document.body.appendChild($container);
    });

    afterEach(function () {
        document.body.removeChild($container);
    });

    it('should update progression', function () {
        var progress = initProgress($container, {});
        var $progression = progress.engine.$progression;

        progress.engine.updateProgression(50);
        expect($progression.textContent).toEqual('50%');
    });

    it('should update progression with custom format', function () {
        var progress = initProgress($container, { progression: { format: 'Progression: {{percent}}%' } });
        var $progression = progress.engine.$progression;

        progress.engine.updateProgression(50);
        expect($progression.textContent).toEqual('Progression: 50%');
    });

});

describe('`ProgressBarModuleEngineBootstrap::onInit(data)`', function () {

    var $container;

    beforeEach(function () {
        $container = document.createElement('div');
        $container.setAttribute('id', 'container');
        document.body.appendChild($container);
    });

    afterEach(function () {
        document.body.removeChild($container);
    });

    it('should not be indeterminate', function () {
        var progress = initProgress($container, {});
        var $progressbar = progress.engine.$progressbar;

        progress.engine.onInit({ indeterminate: false, min: 50, value: 100, max: 200 });
        expect(parseInt($progressbar.getAttribute('aria-valuemin'), 10)).toEqual(50);
        expect(parseInt($progressbar.getAttribute('aria-valuenow'), 10)).toEqual(100);
        expect(parseInt($progressbar.getAttribute('aria-valuemax'), 10)).toEqual(200);
    });

    it('should be indeterminate', function () {
        var progress = initProgress($container, {});
        var $progressbar = progress.engine.$progressbar;

        progress.engine.onInit({ indeterminate: true, min: 500, value: 1000, max: 2000 });
        expect(parseInt($progressbar.getAttribute('aria-valuemin'), 10)).toEqual(0); // 0 is default value when indeterminate
        expect(parseInt($progressbar.getAttribute('aria-valuenow'), 10)).toEqual(100); // 100 is ...
        expect(parseInt($progressbar.getAttribute('aria-valuemax'), 10)).toEqual(100); //  100 is ...
        expect($progressbar.classList).toContain('progress-bar-striped');
        expect($progressbar.classList).toContain('active');
        expect($progressbar.style.width).toEqual('100%');
    });

});


describe('`ProgressBarModuleEngineBootstrap::onUpdate(data)`', function () {

    var $container;

    beforeEach(function () {
        $container = document.createElement('div');
        $container.setAttribute('id', 'container');
        document.body.appendChild($container);
    });

    afterEach(function () {
        document.body.removeChild($container);
    });

    it('should be updated', function () {
        var progress = initProgress($container, { progression: { format: 'Progression: {{percent}}%' } });
        var $progressbar = progress.engine.$progressbar;
        var $progression = progress.engine.$progression;
        var $label = progress.engine.$label;

        progress.engine.onInit({ indeterminate: false, min: 0, value: 0, max: 100 });
        expect(parseInt($progressbar.getAttribute('aria-valuemin'), 10)).toEqual(0);
        expect(parseInt($progressbar.getAttribute('aria-valuenow'), 10)).toEqual(0);
        expect(parseInt($progressbar.getAttribute('aria-valuemax'), 10)).toEqual(100);

        progress.engine.onUpdate({ value: 50 });
        expect(parseInt($progressbar.getAttribute('aria-valuenow'), 10)).toEqual(50);
        expect($progressbar.style.width).toEqual('50%');
        expect($progression.textContent).toEqual('Progression: 50%');
        expect($label.textContent).toEqual('');

        progress.engine.onUpdate({ value: 70, label: 'A label...' });
        expect(parseInt($progressbar.getAttribute('aria-valuenow'), 10)).toEqual(70);
        expect($progressbar.style.width).toEqual('70%');
        expect($progression.textContent).toEqual('Progression: 70%');
        expect($label.textContent).toEqual('A label...');
    });

});
