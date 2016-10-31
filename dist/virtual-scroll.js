"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var VirtualScrollComponent = (function () {
    function VirtualScrollComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.items = [];
        this.marginX = 0;
        this.marginY = 0;
        this.update = new core_1.EventEmitter();
        this.onScrollListener = this.renderer.listen(this.element.nativeElement, 'scroll', this.refresh.bind(this));
    }
    VirtualScrollComponent.prototype.ngOnChanges = function () {
        this.previousStart = undefined;
        this.previousEnd = undefined;
        this.refresh();
    };
    VirtualScrollComponent.prototype.ngOnDestroy = function () {
        this.onScrollListener();
    };
    VirtualScrollComponent.prototype.refresh = function () {
        requestAnimationFrame(this.calculateItems.bind(this));
    };
    VirtualScrollComponent.prototype.scrollInto = function (item) {
        var index = (this.items || []).indexOf(item);
        if (index < 0 || index >= (this.items || []).length)
            return;
        var el = this.element.nativeElement;
        var viewWidth = el.clientWidth;
        var viewHeight = el.clientHeight;
        var childWidth = ((el.children[1] || {}).clientWidth || viewWidth) + (this.marginX * 2);
        var childHeight = ((el.children[1] || {}).clientHeight || viewHeight) + (this.marginY * 2);
        var itemsPerRow = Math.max(1, Math.floor(viewWidth / childWidth));
        var itemsPerCol = Math.max(1, Math.floor(viewHeight / childHeight));
        el.scrollTop = Math.floor(index / itemsPerRow) * childHeight - Math.max(0, (itemsPerCol - 1)) * childHeight;
        this.refresh();
    };
    VirtualScrollComponent.prototype.calculateItems = function () {
        var el = this.element.nativeElement;
        var scrollTop = el.scrollTop;
        var itemCount = (this.items || []).length;
        var viewWidth = el.clientWidth;
        var viewHeight = el.clientHeight;
        var childWidth = ((el.children[1] || {}).clientWidth || viewWidth) + (this.marginX * 2);
        var childHeight = ((el.children[1] || {}).clientHeight || viewHeight) + (this.marginY * 2);
        var itemsPerRow = Math.max(1, Math.floor(viewWidth / childWidth));
        var itemsPerCol = Math.max(1, Math.floor(viewHeight / childHeight));
        var scrollHeight = childHeight * itemCount / itemsPerRow;
        var start = Math.floor(scrollTop / scrollHeight * itemCount / itemsPerRow) * itemsPerRow;
        var end = Math.min(itemCount, Math.ceil(scrollTop / scrollHeight * itemCount / itemsPerRow) * itemsPerRow + itemsPerRow * (itemsPerCol + 1));
        this.topPadding = childHeight * Math.ceil(start / itemsPerRow);
        this.bottomPadding = childHeight * Math.ceil((itemCount - end) / itemsPerRow);
        if (start !== this.previousStart || end !== this.previousEnd) {
            this.update.emit((this.items || []).slice(start, end));
        }
        this.previousStart = start;
        this.previousEnd = end;
    };
    return VirtualScrollComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], VirtualScrollComponent.prototype, "items", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], VirtualScrollComponent.prototype, "marginX", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], VirtualScrollComponent.prototype, "marginY", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], VirtualScrollComponent.prototype, "update", void 0);
VirtualScrollComponent = __decorate([
    core_1.Component({
        selector: 'du-virtual-scroll',
        template: "\n        <div class=\"padding-layer\" [style.height]=\"topPadding + 'px'\"></div>\n        <ng-content></ng-content>\n        <div class=\"padding-layer\" [style.height]=\"bottomPadding + 'px'\"></div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], VirtualScrollComponent);
exports.VirtualScrollComponent = VirtualScrollComponent;
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    VirtualScrollModule.forRoot = function () {
        return {
            ngModule: VirtualScrollModule,
            providers: []
        };
    };
    return VirtualScrollModule;
}());
VirtualScrollModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [VirtualScrollComponent],
        declarations: [VirtualScrollComponent]
    }),
    __metadata("design:paramtypes", [])
], VirtualScrollModule);
exports.VirtualScrollModule = VirtualScrollModule;
//# sourceMappingURL=virtual-scroll.js.map