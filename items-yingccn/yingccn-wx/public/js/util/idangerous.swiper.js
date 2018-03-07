var Swiper = function(e, b) {
		function l(a, b) {
			return document.querySelectorAll ? (b || document).querySelectorAll(a) : jQuery(a, b)
		}
		function g() {
			var c = A - m;
			return b.freeMode && (c = A - m), b.slidesPerView > a.slides.length && !b.centeredSlides && (c = 0), 0 > c && (c = 0), c
		}
		function k() {
			function c(c) {
				var d = new Image;
				d.onload = function() {
					"undefined" != typeof a && null !== a && (void 0 !== a.imagesLoaded && a.imagesLoaded++, a.imagesLoaded === a.imagesToLoad.length && (a.reInit(), b.onImagesReady && a.fireCallback(b.onImagesReady, a)))
				};
				d.src = c
			}
			var d = a.h.addEventListener,
				f = "wrapper" === b.eventTarget ? a.wrapper : a.container;
			if (a.browser.ie10 || a.browser.ie11 ? (d(f, a.touchEvents.touchStart, B), d(document, a.touchEvents.touchMove, C), d(document, a.touchEvents.touchEnd, D)) : (a.support.touch && (d(f, "touchstart", B), d(f, "touchmove", C), d(f, "touchend", D)), b.simulateTouch && (d(f, "mousedown", B), d(document, "mousemove", C), d(document, "mouseup", D))), b.autoResize && d(window, "resize", a.resizeFix), p(), a._wheelEvent = !1, b.mousewheelControl) {
				if (void 0 !== document.onmousewheel && (a._wheelEvent = "mousewheel"), !a._wheelEvent) try {
					new WheelEvent("wheel"), a._wheelEvent = "wheel"
				} catch (ba) {}
				a._wheelEvent || (a._wheelEvent = "DOMMouseScroll");
				a._wheelEvent && d(a.container, a._wheelEvent, I)
			}
			if (b.keyboardControl && d(document, "keydown", E), b.updateOnImagesReady) for (a.imagesToLoad = l("img", a.container), d = 0; d < a.imagesToLoad.length; d++) c(a.imagesToLoad[d].getAttribute("src"))
		}
		function p() {
			var c, d = a.h.addEventListener;
			if (b.preventLinks) {
				var f = l("a", a.container);
				for (c = 0; c < f.length; c++) d(f[c], "click", Q)
			}
			if (b.releaseFormElements) for (f = l("input, textarea, select", a.container), c = 0; c < f.length; c++) d(f[c], a.touchEvents.touchStart, R, !0);
			if (b.onSlideClick) for (c = 0; c < a.slides.length; c++) d(a.slides[c], "click", S);
			if (b.onSlideTouch) for (c = 0; c < a.slides.length; c++) d(a.slides[c], a.touchEvents.touchStart, T)
		}
		function z() {
			var c, d = a.h.removeEventListener;
			if (b.onSlideClick) for (c = 0; c < a.slides.length; c++) d(a.slides[c], "click", S);
			if (b.onSlideTouch) for (c = 0; c < a.slides.length; c++) d(a.slides[c], a.touchEvents.touchStart, T);
			if (b.releaseFormElements) {
				var f = l("input, textarea, select", a.container);
				for (c = 0; c < f.length; c++) d(f[c], a.touchEvents.touchStart, R, !0)
			}
			if (b.preventLinks) for (f = l("a", a.container), c = 0; c < f.length; c++) d(f[c], "click", Q)
		}
		function E(c) {
			var b = c.keyCode || c.charCode;
			if (!(c.shiftKey || c.altKey || c.ctrlKey || c.metaKey)) {
				if (37 === b || 39 === b || 38 === b || 40 === b) {
					for (var f = !1, e = a.h.getOffset(a.container), h = a.h.windowScroll().left, g = a.h.windowScroll().top, v = a.h.windowWidth(), k = a.h.windowHeight(), e = [
						[e.left, e.top],
						[e.left + a.width, e.top],
						[e.left, e.top + a.height],
						[e.left + a.width, e.top + a.height]
					], l = 0; l < e.length; l++) {
						var m = e[l];
						m[0] >= h && m[0] <= h + v && m[1] >= g && m[1] <= g + k && (f = !0)
					}
					if (!f) return
				}
				n ? ((37 === b || 39 === b) && (c.preventDefault ? c.preventDefault() : c.returnValue = !1), 39 === b && a.swipeNext(), 37 === b && a.swipePrev()) : ((38 === b || 40 === b) && (c.preventDefault ? c.preventDefault() : c.returnValue = !1), 40 === b && a.swipeNext(), 38 === b && a.swipePrev())
			}
		}
		function I(c) {
			var d = a._wheelEvent,
				f = 0;
			if (c.detail) f = -c.detail;
			else if ("mousewheel" === d) if (b.mousewheelControlForceToAxis) if (n) {
				if (!(Math.abs(c.wheelDeltaX) > Math.abs(c.wheelDeltaY))) return;
				f = c.wheelDeltaX
			} else {
				if (!(Math.abs(c.wheelDeltaY) > Math.abs(c.wheelDeltaX))) return;
				f = c.wheelDeltaY
			} else f = c.wheelDelta;
			else if ("DOMMouseScroll" === d) f = -c.detail;
			else if ("wheel" === d) if (b.mousewheelControlForceToAxis) if (n) {
				if (!(Math.abs(c.deltaX) > Math.abs(c.deltaY))) return;
				f = -c.deltaX
			} else {
				if (!(Math.abs(c.deltaY) > Math.abs(c.deltaX))) return;
				f = -c.deltaY
			} else f = Math.abs(c.deltaX) > Math.abs(c.deltaY) ? -c.deltaX : -c.deltaY;
			if (b.freeMode) {
				if (d = a.getWrapperTranslate() + f, 0 < d && (d = 0), d < -g() && (d = -g()), a.setWrapperTransition(0), a.setWrapperTranslate(d), a.updateActiveSlide(d), 0 === d || d === -g()) return
			} else 60 < (new Date).getTime() - U && (0 > f ? a.swipeNext() : a.swipePrev()), U = (new Date).getTime();
			return b.autoplay && a.stopAutoplay(!0), c.preventDefault ? c.preventDefault() : c.returnValue = !1, !1
		}
		function S(c) {
			a.allowSlideClick && (V(c), a.fireCallback(b.onSlideClick, a, c))
		}
		function T(c) {
			V(c);
			a.fireCallback(b.onSlideTouch, a, c)
		}
		function V(c) {
			if (c.currentTarget) a.clickedSlide = c.currentTarget;
			else {
				c = c.srcElement;
				do {
					if (-1 < c.className.indexOf(b.slideClass)) break;
					c = c.parentNode
				} while (c);
				a.clickedSlide = c
			}
			a.clickedSlideIndex = a.slides.indexOf(a.clickedSlide);
			a.clickedSlideLoopIndex = a.clickedSlideIndex - (a.loopedSlides || 0)
		}
		function Q(c) {
			return a.allowLinks ? void 0 : (c.preventDefault ? c.preventDefault() : c.returnValue = !1, b.preventLinksPropagation && "stopPropagation" in c && c.stopPropagation(), !1)
		}
		function R(a) {
			return a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !1
		}
		function B(c) {
			if (b.preventLinks && (a.allowLinks = !0), a.isTouched || b.onlyExternal) return !1;
			var d = c.target || c.srcElement;
			document.activeElement && document.activeElement !== d && document.activeElement.blur();
			var f = ["input", "select", "textarea"],
				e;
			if (e = b.noSwiping && d) {
				e = d;
				var h = !1;
				do - 1 < e.className.indexOf(b.noSwipingClass) && (h = !0), e = e.parentElement;
				while (!h && e.parentElement && -1 === e.className.indexOf(b.wrapperClass));
				e = (!h && -1 < e.className.indexOf(b.wrapperClass) && -1 < e.className.indexOf(b.noSwipingClass) && (h = !0), h)
			}
			if (e || (J = !1, a.isTouched = !0, u = "touchstart" === c.type, !u && "which" in c && 3 === c.which)) return !1;
			u && 1 !== c.targetTouches.length || (a.callPlugins("onTouchStartBegin"), !u && !a.isAndroid && 0 > f.indexOf(d.tagName.toLowerCase()) && (c.preventDefault ? c.preventDefault() : c.returnValue = !1), d = u ? c.targetTouches[0].pageX : c.pageX || c.clientX, f = u ? c.targetTouches[0].pageY : c.pageY || c.clientY, a.touches.startX = a.touches.currentX = d, a.touches.startY = a.touches.currentY = f, a.touches.start = a.touches.current = n ? d : f, a.setWrapperTransition(0), a.positions.start = a.positions.current = a.getWrapperTranslate(), a.setWrapperTranslate(a.positions.start), a.times.start = (new Date).getTime(), x = void 0, 0 < b.moveStartThreshold && (K = !1), b.onTouchStart && a.fireCallback(b.onTouchStart, a, c), a.callPlugins("onTouchStartEnd"))
		}
		function C(c) {
			if (a.isTouched && !b.onlyExternal && (!u || "mousemove" !== c.type)) {
				var d = u ? c.targetTouches[0].pageX : c.pageX || c.clientX,
					f = u ? c.targetTouches[0].pageY : c.pageY || c.clientY;
				if ("undefined" == typeof x && n && (x = !! (x || Math.abs(f - a.touches.startY) > Math.abs(d - a.touches.startX))), "undefined" != typeof x || n || (x = !! (x || Math.abs(f - a.touches.startY) < Math.abs(d - a.touches.startX))), x) return void(a.isTouched = !1);
				if (n) {
					if (!b.swipeToNext && d < a.touches.startX || !b.swipeToPrev && d > a.touches.startX) return
				} else if (!b.swipeToNext && f < a.touches.startY || !b.swipeToPrev && f > a.touches.startY) return;
				if (c.assignedToSwiper) return void(a.isTouched = !1);
				if (c.assignedToSwiper = !0, b.preventLinks && (a.allowLinks = !1), b.onSlideClick && (a.allowSlideClick = !1), b.autoplay && a.stopAutoplay(!0), !u || 1 === c.touches.length) {
					if (a.isMoved || (a.callPlugins("onTouchMoveStart"), b.loop && (a.fixLoop(), a.positions.start = a.getWrapperTranslate()), b.onTouchMoveStart && a.fireCallback(b.onTouchMoveStart, a)), a.isMoved = !0, c.preventDefault ? c.preventDefault() : c.returnValue = !1, a.touches.current = n ? d : f, a.positions.current = (a.touches.current - a.touches.start) * b.touchRatio + a.positions.start, 0 < a.positions.current && b.onResistanceBefore && a.fireCallback(b.onResistanceBefore, a, a.positions.current), a.positions.current < -g() && b.onResistanceAfter && a.fireCallback(b.onResistanceAfter, a, Math.abs(a.positions.current + g())), b.resistance && "100%" !== b.resistance) {
						var e;
						if (0 < a.positions.current && (e = 1 - a.positions.current / m / 2, a.positions.current = .5 > e ? m / 2 : a.positions.current * e), a.positions.current < -g()) d = (a.touches.current - a.touches.start) * b.touchRatio + (g() + a.positions.start), e = (m + d) / m, d = a.positions.current - d * (1 - e) / 2, f = -g() - m / 2, a.positions.current = f > d || 0 >= e ? f : d
					}
					if (b.resistance && "100%" === b.resistance && (0 < a.positions.current && (!b.freeMode || b.freeModeFluid) && (a.positions.current = 0), a.positions.current < -g() && (!b.freeMode || b.freeModeFluid) && (a.positions.current = -g())), b.followFinger) {
						if (b.moveStartThreshold) if (Math.abs(a.touches.current - a.touches.start) > b.moveStartThreshold || K) {
							if (!K) return K = !0, void(a.touches.start = a.touches.current);
							a.setWrapperTranslate(a.positions.current)
						} else a.positions.current = a.positions.start;
						else a.setWrapperTranslate(a.positions.current);
						return (b.freeMode || b.watchActiveIndex) && a.updateActiveSlide(a.positions.current), b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grabbing", a.container.style.cursor = "-moz-grabbin", a.container.style.cursor = "-webkit-grabbing"), G || (G = a.touches.current), L || (L = (new Date).getTime()), a.velocity = (a.touches.current - G) / ((new Date).getTime() - L) / 2, 2 > Math.abs(a.touches.current - G) && (a.velocity = 0), G = a.touches.current, L = (new Date).getTime(), a.callPlugins("onTouchMoveEnd"), b.onTouchMove && a.fireCallback(b.onTouchMove, a, c), !1
					}
				}
			}
		}
		function D(c) {
			if (x && a.swipeReset(), !b.onlyExternal && a.isTouched) {
				a.isTouched = !1;
				b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grab", a.container.style.cursor = "-moz-grab", a.container.style.cursor = "-webkit-grab");
				a.positions.current || 0 === a.positions.current || (a.positions.current = a.positions.start);
				b.followFinger && a.setWrapperTranslate(a.positions.current);
				a.times.end = (new Date).getTime();
				a.touches.diff = a.touches.current - a.touches.start;
				a.touches.abs = Math.abs(a.touches.diff);
				a.positions.diff = a.positions.current - a.positions.start;
				a.positions.abs = Math.abs(a.positions.diff);
				var d = a.positions.diff,
					f = a.positions.abs,
					e = a.times.end - a.times.start;
				5 > f && 300 > e && !1 === a.allowLinks && (b.freeMode || 0 === f || a.swipeReset(), b.preventLinks && (a.allowLinks = !0), b.onSlideClick && (a.allowSlideClick = !0));
				setTimeout(function() {
					"undefined" != typeof a && null !== a && (b.preventLinks && (a.allowLinks = !0), b.onSlideClick && (a.allowSlideClick = !0))
				}, 100);
				var h = g();
				if (!a.isMoved && b.freeMode) return a.isMoved = !1, b.onTouchEnd && a.fireCallback(b.onTouchEnd, a, c), void a.callPlugins("onTouchEnd");
				if (!a.isMoved || 0 < a.positions.current || a.positions.current < -h) return a.swipeReset(), b.onTouchEnd && a.fireCallback(b.onTouchEnd, a, c), void a.callPlugins("onTouchEnd");
				if (a.isMoved = !1, b.freeMode) {
					if (b.freeModeFluid) {
						var l, f = 1E3 * b.momentumRatio,
							v = a.positions.current + a.velocity * f,
							d = !1,
							k = 20 * Math.abs(a.velocity) * b.momentumBounceRatio; - h > v && (b.momentumBounce && a.support.transitions ? (-k > v + h && (v = -h - k), l = -h, d = !0, J = !0) : v = -h);
						0 < v && (b.momentumBounce && a.support.transitions ? (v > k && (v = k), l = 0, d = !0, J = !0) : v = 0);
						0 !== a.velocity && (f = Math.abs((v - a.positions.current) / a.velocity));
						a.setWrapperTranslate(v);
						a.setWrapperTransition(f);
						b.momentumBounce && d && a.wrapperTransitionEnd(function() {
							J && (b.onMomentumBounce && a.fireCallback(b.onMomentumBounce, a), a.callPlugins("onMomentumBounce"), a.setWrapperTranslate(l), a.setWrapperTransition(300))
						});
						a.updateActiveSlide(v)
					}
					return (!b.freeModeFluid || 300 <= e) && a.updateActiveSlide(a.positions.current), b.onTouchEnd && a.fireCallback(b.onTouchEnd, a, c), void a.callPlugins("onTouchEnd")
				}
				H = 0 > d ? "toNext" : "toPrev";
				"toNext" === H && 300 >= e && (30 > f || !b.shortSwipes ? a.swipeReset() : a.swipeNext(!0));
				"toPrev" === H && 300 >= e && (30 > f || !b.shortSwipes ? a.swipeReset() : a.swipePrev(!0));
				h = 0;
				if ("auto" === b.slidesPerView) {
					for (var d = Math.abs(a.getWrapperTranslate()), p = k = 0; p < a.slides.length; p++) if (v = n ? a.slides[p].getWidth(!0, b.roundLengths) : a.slides[p].getHeight(!0, b.roundLengths), k += v, k > d) {
						h = v;
						break
					}
					h > m && (h = m)
				} else h = t * b.slidesPerView;
				"toNext" === H && 300 < e && (f >= h * b.longSwipesRatio ? a.swipeNext(!0) : a.swipeReset());
				"toPrev" === H && 300 < e && (f >= h * b.longSwipesRatio ? a.swipePrev(!0) : a.swipeReset());
				b.onTouchEnd && a.fireCallback(b.onTouchEnd, a, c);
				a.callPlugins("onTouchEnd")
			}
		}
		function W(a, b) {
			var c, d = document.createElement("div");
			return d.innerHTML = b, c = d.firstChild, c.className += " " + a, c.outerHTML
		}
		function M(c, d, f) {
			function e() {
				k += l * (+new Date - g) / (1E3 / 60);
				(n = "toNext" === m ? k > c : c > k) ? (a.setWrapperTranslate(Math.ceil(k)), a._DOMAnimating = !0, window.setTimeout(function() {
					e()
				}, 1E3 / 60)) : (b.onSlideChangeEnd && ("to" === d ? !0 === f.runCallbacks && a.fireCallback(b.onSlideChangeEnd, a, m) : a.fireCallback(b.onSlideChangeEnd, a, m)), a.setWrapperTranslate(c), a._DOMAnimating = !1)
			}
			var h = "to" === d && 0 <= f.speed ? f.speed : b.speed,
				g = +new Date;
			if (a.support.transitions || !b.DOMAnimation) a.setWrapperTranslate(c), a.setWrapperTransition(h);
			else {
				var k = a.getWrapperTranslate(),
					l = Math.ceil((c - k) / h * (1E3 / 60)),
					m = k > c ? "toNext" : "toPrev",
					n = "toNext" === m ? k > c : c > k;
				if (a._DOMAnimating) return;
				e()
			}
			a.updateActiveSlide(c);
			b.onSlideNext && "next" === d && a.fireCallback(b.onSlideNext, a, c);
			b.onSlidePrev && "prev" === d && a.fireCallback(b.onSlidePrev, a, c);
			b.onSlideReset && "reset" === d && a.fireCallback(b.onSlideReset, a, c);
			("next" === d || "prev" === d || "to" === d && !0 === f.runCallbacks) && aa(d)
		}
		function aa(c) {
			if (a.callPlugins("onSlideChangeStart"), b.onSlideChangeStart) if (b.queueStartCallbacks && a.support.transitions) {
				if (a._queueStartCallbacks) return;
				a._queueStartCallbacks = !0;
				a.fireCallback(b.onSlideChangeStart, a, c);
				a.wrapperTransitionEnd(function() {
					a._queueStartCallbacks = !1
				})
			} else a.fireCallback(b.onSlideChangeStart, a, c);
			b.onSlideChangeEnd && (a.support.transitions ? b.queueEndCallbacks ? a._queueEndCallbacks || (a._queueEndCallbacks = !0, a.wrapperTransitionEnd(function(d) {
				a.fireCallback(b.onSlideChangeEnd, d, c)
			})) : a.wrapperTransitionEnd(function(d) {
				a.fireCallback(b.onSlideChangeEnd, d, c)
			}) : b.DOMAnimation || setTimeout(function() {
				a.fireCallback(b.onSlideChangeEnd, a, c)
			}, 10))
		}
		function X() {
			var c = a.paginationButtons;
			if (c) for (var b = 0; b < c.length; b++) a.h.removeEventListener(c[b], "click", Y)
		}
		function Y(c) {
			var d;
			c = c.target || c.srcElement;
			for (var f = a.paginationButtons, e = 0; e < f.length; e++) c === f[e] && (d = e);
			b.autoplay && a.stopAutoplay(!0);
			a.swipeTo(d)
		}
		function P() {
			r = setTimeout(function() {
				b.loop ? (a.fixLoop(), a.swipeNext(!0)) : a.swipeNext(!0) || (b.autoplayStopOnLast ? (clearTimeout(r), r = void 0) : a.swipeTo(0));
				a.wrapperTransitionEnd(function() {
					"undefined" != typeof r && P()
				})
			}, b.autoplay)
		}
		if (!document.body.outerHTML && document.body.__defineGetter__ && HTMLElement) {
			var Z = HTMLElement.prototype;
			Z.__defineGetter__ && Z.__defineGetter__("outerHTML", function() {
				return (new XMLSerializer).serializeToString(this)
			})
		}
		if (window.getComputedStyle || (window.getComputedStyle = function(a) {
			return this.el = a, this.getPropertyValue = function(c) {
				var b = /(\-([a-z]){1})/g;
				return "float" === c && (c = "styleFloat"), b.test(c) && (c = c.replace(b, function(a, c, b) {
					return b.toUpperCase()
				})), a.currentStyle[c] ? a.currentStyle[c] : null
			}, this
		}), Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
			b = b || 0;
			for (var c = this.length; c > b; b++) if (this[b] === a) return b;
			return -1
		}), (document.querySelectorAll || window.jQuery) && "undefined" != typeof e && (e.nodeType || 0 !== l(e).length)) {
			var a = this;
			a.touches = {
				start: 0,
				startX: 0,
				startY: 0,
				current: 0,
				currentX: 0,
				currentY: 0,
				diff: 0,
				abs: 0
			};
			a.positions = {
				start: 0,
				abs: 0,
				diff: 0,
				current: 0
			};
			a.times = {
				start: 0,
				end: 0
			};
			a.id = (new Date).getTime();
			a.container = e.nodeType ? e : l(e)[0];
			a.isTouched = !1;
			a.isMoved = !1;
			a.activeIndex = 0;
			a.centerIndex = 0;
			a.activeLoaderIndex = 0;
			a.activeLoopIndex = 0;
			a.previousIndex = null;
			a.velocity = 0;
			a.snapGrid = [];
			a.slidesGrid = [];
			a.imagesToLoad = [];
			a.imagesLoaded = 0;
			a.wrapperLeft = 0;
			a.wrapperRight = 0;
			a.wrapperTop = 0;
			a.wrapperBottom = 0;
			a.isAndroid = 0 <= navigator.userAgent.toLowerCase().indexOf("android");
			var N, t, A, H, x, m;
			e = {
				eventTarget: "wrapper",
				mode: "horizontal",
				touchRatio: 1,
				speed: 300,
				freeMode: !1,
				freeModeFluid: !1,
				momentumRatio: 1,
				momentumBounce: !0,
				momentumBounceRatio: 1,
				slidesPerView: 1,
				slidesPerGroup: 1,
				slidesPerViewFit: !0,
				simulateTouch: true,
				followFinger: !0,
				shortSwipes: !0,
				longSwipesRatio: .5,
				moveStartThreshold: !1,
				onlyExternal: !1,
				createPagination: !0,
				pagination: !1,
				paginationElement: "span",
				paginationClickable: !1,
				paginationAsRange: !0,
				resistance: !0,
				scrollContainer: !1,
				preventLinks: !0,
				preventLinksPropagation: !1,
				noSwiping: !1,
				noSwipingClass: "swiper-no-swiping",
				initialSlide: 0,
				keyboardControl: !1,
				mousewheelControl: !1,
				mousewheelControlForceToAxis: !1,
				useCSS3Transforms: !0,
				autoplay: !1,
				autoplayDisableOnInteraction: !0,
				autoplayStopOnLast: !1,
				loop: !1,
				loopAdditionalSlides: 0,
				roundLengths: !1,
				calculateHeight: !1,
				cssWidthAndHeight: !1,
				updateOnImagesReady: !0,
				releaseFormElements: !0,
				watchActiveIndex: !1,
				visibilityFullFit: !1,
				offsetPxBefore: 0,
				offsetPxAfter: 0,
				offsetSlidesBefore: 0,
				offsetSlidesAfter: 0,
				centeredSlides: !1,
				queueStartCallbacks: !1,
				queueEndCallbacks: !1,
				autoResize: !0,
				resizeReInit: !1,
				DOMAnimation: !0,
				loader: {
					slides: [],
					slidesHTMLType: "inner",
					surroundGroups: 1,
					logic: "reload",
					loadAllSlides: !1
				},
				swipeToPrev: !0,
				swipeToNext: !0,
				slideElement: "div",
				slideClass: "swiper-slide",
				slideActiveClass: "swiper-slide-active",
				slideVisibleClass: "swiper-slide-visible",
				slideDuplicateClass: "swiper-slide-duplicate",
				wrapperClass: "swiper-wrapper",
				paginationElementClass: "swiper-pagination-switch",
				paginationActiveClass: "swiper-active-switch",
				paginationVisibleClass: "swiper-visible-switch"
			};
			b = b || {};
			for (var q in e) if (q in b && "object" == typeof b[q]) for (var F in e[q]) F in b[q] || (b[q][F] = e[q][F]);
			else q in b || (b[q] = e[q]);
			a.params = b;
			b.scrollContainer && (b.freeMode = !0, b.freeModeFluid = !0);
			b.loop && (b.resistance = "100%");
			var n = "horizontal" === b.mode;
			q = ["mousedown", "mousemove", "mouseup"];
			a.browser.ie10 && (q = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]);
			a.browser.ie11 && (q = ["pointerdown", "pointermove", "pointerup"]);
			a.touchEvents = {
				touchStart: a.support.touch || !b.simulateTouch ? "touchstart" : q[0],
				touchMove: a.support.touch || !b.simulateTouch ? "touchmove" : q[1],
				touchEnd: a.support.touch || !b.simulateTouch ? "touchend" : q[2]
			};
			for (q = a.container.childNodes.length - 1; 0 <= q; q--) if (a.container.childNodes[q].className) for (F = a.container.childNodes[q].className.split(/\s+/), e = 0; e < F.length; e++) F[e] === b.wrapperClass && (N = a.container.childNodes[q]);
			a.wrapper = N;
			a._extendSwiperSlide = function(c) {
				return c.append = function() {
					return b.loop ? c.insertAfter(a.slides.length - a.loopedSlides) : (a.wrapper.appendChild(c), a.reInit()), c
				}, c.prepend = function() {
					return b.loop ? (a.wrapper.insertBefore(c, a.slides[a.loopedSlides]), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.wrapper.insertBefore(c, a.wrapper.firstChild), a.reInit(), c
				}, c.insertAfter = function(d) {
					if ("undefined" == typeof d) return !1;
					var f;
					return b.loop ? (f = a.slides[d + 1 + a.loopedSlides], f ? a.wrapper.insertBefore(c, f) : a.wrapper.appendChild(c), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : (f = a.slides[d + 1], a.wrapper.insertBefore(c, f)), a.reInit(), c
				}, c.clone = function() {
					return a._extendSwiperSlide(c.cloneNode(!0))
				}, c.remove = function() {
					a.wrapper.removeChild(c);
					a.reInit()
				}, c.html = function(a) {
					return "undefined" == typeof a ? c.innerHTML : (c.innerHTML = a, c)
				}, c.index = function() {
					for (var b, f = a.slides.length - 1; 0 <= f; f--) c === a.slides[f] && (b = f);
					return b
				}, c.isActive = function() {
					return c.index() === a.activeIndex ? !0 : !1
				}, c.swiperSlideDataStorage || (c.swiperSlideDataStorage = {}), c.getData = function(a) {
					return c.swiperSlideDataStorage[a]
				}, c.setData = function(a, b) {
					return c.swiperSlideDataStorage[a] = b, c
				}, c.data = function(a, b) {
					return "undefined" == typeof b ? c.getAttribute("data-" + a) : (c.setAttribute("data-" + a, b), c)
				}, c.getWidth = function(b, f) {
					return a.h.getWidth(c, b, f)
				}, c.getHeight = function(b, f) {
					return a.h.getHeight(c, b, f)
				}, c.getOffset = function() {
					return a.h.getOffset(c)
				}, c
			};
			a.calcSlides = function(c) {
				var d = a.slides ? a.slides.length : !1;
				a.slides = [];
				a.displaySlides = [];
				for (var f = 0; f < a.wrapper.childNodes.length; f++) if (a.wrapper.childNodes[f].className) for (var e = a.wrapper.childNodes[f].className.split(/\s+/), h = 0; h < e.length; h++) e[h] === b.slideClass && a.slides.push(a.wrapper.childNodes[f]);
				for (f = a.slides.length - 1; 0 <= f; f--) a._extendSwiperSlide(a.slides[f]);
				!1 !== d && (d !== a.slides.length || c) && (z(), p(), a.updateActiveSlide(), a.params.pagination && a.createPagination(), a.callPlugins("numberOfSlidesChanged"))
			};
			a.createSlide = function(c, d, f) {
				d = d || a.params.slideClass;
				f = f || b.slideElement;
				f = document.createElement(f);
				return f.innerHTML = c || "", f.className = d, a._extendSwiperSlide(f)
			};
			a.appendSlide = function(c, b, f) {
				return c ? c.nodeType ? a._extendSwiperSlide(c).append() : a.createSlide(c, b, f).append() : void 0
			};
			a.prependSlide = function(c, b, f) {
				return c ? c.nodeType ? a._extendSwiperSlide(c).prepend() : a.createSlide(c, b, f).prepend() : void 0
			};
			a.insertSlideAfter = function(b, d, f, e) {
				return "undefined" == typeof b ? !1 : d.nodeType ? a._extendSwiperSlide(d).insertAfter(b) : a.createSlide(d, f, e).insertAfter(b)
			};
			a.removeSlide = function(c) {
				if (a.slides[c]) {
					if (b.loop) {
						if (!a.slides[c + a.loopedSlides]) return !1;
						a.slides[c + a.loopedSlides].remove();
						a.removeLoopedSlides();
						a.calcSlides();
						a.createLoop()
					} else a.slides[c].remove();
					return !0
				}
				return !1
			};
			a.removeLastSlide = function() {
				return 0 < a.slides.length ? (b.loop ? (a.slides[a.slides.length - 1 - a.loopedSlides].remove(), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.slides[a.slides.length - 1].remove(), !0) : !1
			};
			a.removeAllSlides = function() {
				for (var b = a.slides.length - 1; 0 <= b; b--) a.slides[b].remove()
			};
			a.getSlide = function(b) {
				return a.slides[b]
			};
			a.getLastSlide = function() {
				return a.slides[a.slides.length - 1]
			};
			a.getFirstSlide = function() {
				return a.slides[0]
			};
			a.activeSlide = function() {
				return a.slides[a.activeIndex]
			};
			a.fireCallback = function(c, d, f, e, h, g) {
				if ("[object Array]" === Object.prototype.toString.call(c)) for (var k = 0; k < c.length; k++)"function" == typeof c[k] && c[k](d, f, e, h, g);
				else "[object String]" === Object.prototype.toString.call(c) ? b["on" + c] && a.fireCallback(b["on" + c], d, f, e, h, g) : c(d, f, e, h, g)
			};
			a.addCallback = function(a, b) {
				var c;
				return this.params["on" + a] ? "[object Array]" === Object.prototype.toString.apply(this.params["on" + a]) ? this.params["on" + a].push(b) : "function" == typeof this.params["on" + a] ? (c = this.params["on" + a], this.params["on" + a] = [], this.params["on" + a].push(c), this.params["on" + a].push(b)) : void 0 : (this.params["on" + a] = [], this.params["on" + a].push(b))
			};
			a.removeCallbacks = function(b) {
				a.params["on" + b] && (a.params["on" + b] = null)
			};
			var O = [],
				y;
			for (y in a.plugins) b[y] && (q = a.plugins[y](a, b[y])) && O.push(q);
			a.callPlugins = function(a, b) {
				b || (b = {});
				for (var c = 0; c < O.length; c++) a in O[c] && O[c][a](b)
			};
			!a.browser.ie10 && !a.browser.ie11 || b.onlyExternal || a.wrapper.classList.add("swiper-wp8-" + (n ? "horizontal" : "vertical"));
			b.freeMode && (a.container.className += " swiper-free-mode");
			a.initialized = !1;
			a.init = function(c, d) {
				var f = a.h.getWidth(a.container, !1, b.roundLengths),
					e = a.h.getHeight(a.container, !1, b.roundLengths);
				if (f !== a.width || e !== a.height || c) {
					a.width = f;
					a.height = e;
					var h, g;
					m = n ? f : e;
					f = a.wrapper;
					if (c && a.calcSlides(d), "auto" === b.slidesPerView) {
						var k = 0,
							l = 0;
						0 < b.slidesOffset && (f.style.paddingLeft = "", f.style.paddingRight = "", f.style.paddingTop = "", f.style.paddingBottom = "");
						f.style.width = "";
						f.style.height = "";
						0 < b.offsetPxBefore && (n ? a.wrapperLeft = b.offsetPxBefore : a.wrapperTop = b.offsetPxBefore);
						0 < b.offsetPxAfter && (n ? a.wrapperRight = b.offsetPxAfter : a.wrapperBottom = b.offsetPxAfter);
						b.centeredSlides && (n ? (a.wrapperLeft = (m - this.slides[0].getWidth(!0, b.roundLengths)) / 2, a.wrapperRight = (m - a.slides[a.slides.length - 1].getWidth(!0, b.roundLengths)) / 2) : (a.wrapperTop = (m - a.slides[0].getHeight(!0, b.roundLengths)) / 2, a.wrapperBottom = (m - a.slides[a.slides.length - 1].getHeight(!0, b.roundLengths)) / 2));
						n ? (0 <= a.wrapperLeft && (f.style.paddingLeft = a.wrapperLeft + "px"), 0 <= a.wrapperRight && (f.style.paddingRight = a.wrapperRight + "px")) : (0 <= a.wrapperTop && (f.style.paddingTop = a.wrapperTop + "px"), 0 <= a.wrapperBottom && (f.style.paddingBottom = a.wrapperBottom + "px"));
						var p = h = 0;
						a.snapGrid = [];
						a.slidesGrid = [];
						for (g = e = 0; g < a.slides.length; g++) {
							c = a.slides[g].getWidth(!0, b.roundLengths);
							d = a.slides[g].getHeight(!0, b.roundLengths);
							b.calculateHeight && (e = Math.max(e, d));
							var q = n ? c : d;
							if (b.centeredSlides) {
								var r = g === a.slides.length - 1 ? 0 : a.slides[g + 1].getWidth(!0, b.roundLengths),
									u = g === a.slides.length - 1 ? 0 : a.slides[g + 1].getHeight(!0, b.roundLengths),
									r = n ? r : u;
								if (q > m) {
									if (b.slidesPerViewFit) a.snapGrid.push(h + a.wrapperLeft), a.snapGrid.push(h + q - m + a.wrapperLeft);
									else for (u = 0; u <= Math.floor(q / (m + a.wrapperLeft)); u++) a.snapGrid.push(0 === u ? h + a.wrapperLeft : h + a.wrapperLeft + m * u);
									a.slidesGrid.push(h + a.wrapperLeft)
								} else a.snapGrid.push(p), a.slidesGrid.push(p);
								p += q / 2 + r / 2
							} else {
								if (q > m) if (b.slidesPerViewFit) a.snapGrid.push(h), a.snapGrid.push(h + q - m);
								else if (0 !== m) for (r = 0; r <= Math.floor(q / m); r++) a.snapGrid.push(h + m * r);
								else a.snapGrid.push(h);
								else a.snapGrid.push(h);
								a.slidesGrid.push(h)
							}
							h += q;
							k += c;
							l += d
						}
						b.calculateHeight && (a.height = e);
						n ? (A = k + a.wrapperRight + a.wrapperLeft, f.style.width = k + "px", f.style.height = a.height + "px") : (A = l + a.wrapperTop + a.wrapperBottom, f.style.width = a.width + "px", f.style.height = l + "px")
					} else if (b.scrollContainer) f.style.width = "", f.style.height = "", e = a.slides[0].getWidth(!0, b.roundLengths), h = a.slides[0].getHeight(!0, b.roundLengths), A = n ? e : h, f.style.width = e + "px", f.style.height = h + "px", t = n ? e : h;
					else {
						if (b.calculateHeight) {
							h = e = 0;
							n || (a.container.style.height = "");
							f.style.height = "";
							for (g = 0; g < a.slides.length; g++) a.slides[g].style.height = "", e = Math.max(a.slides[g].getHeight(!0), e), n || (h += a.slides[g].getHeight(!0));
							d = e;
							a.height = d;
							n ? h = d : (m = d, a.container.style.height = m + "px")
						} else d = n ? a.height : a.height / b.slidesPerView, b.roundLengths && (d = Math.ceil(d)), h = n ? a.height : a.slides.length * d;
						c = n ? a.width / b.slidesPerView : a.width;
						b.roundLengths && (c = Math.ceil(c));
						e = n ? a.slides.length * c : a.width;
						t = n ? c : d;
						0 < b.offsetSlidesBefore && (n ? a.wrapperLeft = t * b.offsetSlidesBefore : a.wrapperTop = t * b.offsetSlidesBefore);
						0 < b.offsetSlidesAfter && (n ? a.wrapperRight = t * b.offsetSlidesAfter : a.wrapperBottom = t * b.offsetSlidesAfter);
						0 < b.offsetPxBefore && (n ? a.wrapperLeft = b.offsetPxBefore : a.wrapperTop = b.offsetPxBefore);
						0 < b.offsetPxAfter && (n ? a.wrapperRight = b.offsetPxAfter : a.wrapperBottom = b.offsetPxAfter);
						b.centeredSlides && (n ? (a.wrapperLeft = (m - t) / 2, a.wrapperRight = (m - t) / 2) : (a.wrapperTop = (m - t) / 2, a.wrapperBottom = (m - t) / 2));
						n ? (0 < a.wrapperLeft && (f.style.paddingLeft = a.wrapperLeft + "px"), 0 < a.wrapperRight && (f.style.paddingRight = a.wrapperRight + "px")) : (0 < a.wrapperTop && (f.style.paddingTop = a.wrapperTop + "px"), 0 < a.wrapperBottom && (f.style.paddingBottom = a.wrapperBottom + "px"));
						A = n ? e + a.wrapperRight + a.wrapperLeft : h + a.wrapperTop + a.wrapperBottom;
						0 < parseFloat(e) && (!b.cssWidthAndHeight || "height" === b.cssWidthAndHeight) && (f.style.width = e + "px");
						0 < parseFloat(h) && (!b.cssWidthAndHeight || "width" === b.cssWidthAndHeight) && (f.style.height = h + "px");
						h = 0;
						a.snapGrid = [];
						a.slidesGrid = [];
						for (g = 0; g < a.slides.length; g++) a.snapGrid.push(h), a.slidesGrid.push(h), h += t, 0 < parseFloat(c) && (!b.cssWidthAndHeight || "height" === b.cssWidthAndHeight) && (a.slides[g].style.width = c + "px"), 0 < parseFloat(d) && (!b.cssWidthAndHeight || "width" === b.cssWidthAndHeight) && (a.slides[g].style.height = d + "px")
					}
					a.initialized ? (a.callPlugins("onInit"), b.onInit && a.fireCallback(b.onInit, a)) : (a.callPlugins("onFirstInit"), b.onFirstInit && a.fireCallback(b.onFirstInit, a));
					a.initialized = !0
				}
			};
			a.reInit = function(b) {
				a.init(!0, b)
			};
			a.resizeFix = function(c) {
				a.callPlugins("beforeResizeFix");
				a.init(b.resizeReInit || c);
				b.freeMode ? a.getWrapperTranslate() < -g() && (a.setWrapperTransition(0), a.setWrapperTranslate(-g())) : (a.swipeTo(b.loop ? a.activeLoopIndex : a.activeIndex, 0, !1), b.autoplay && (a.support.transitions && "undefined" != typeof r ? "undefined" != typeof r && (clearTimeout(r), r = void 0, a.startAutoplay()) : "undefined" != typeof w && (clearInterval(w), w = void 0, a.startAutoplay())));
				a.callPlugins("afterResizeFix")
			};
			a.destroy = function() {
				var c = a.h.removeEventListener,
					d = "wrapper" === b.eventTarget ? a.wrapper : a.container;
				a.browser.ie10 || a.browser.ie11 ? (c(d, a.touchEvents.touchStart, B), c(document, a.touchEvents.touchMove, C), c(document, a.touchEvents.touchEnd, D)) : (a.support.touch && (c(d, "touchstart", B), c(d, "touchmove", C), c(d, "touchend", D)), b.simulateTouch && (c(d, "mousedown", B), c(document, "mousemove", C), c(document, "mouseup", D)));
				b.autoResize && c(window, "resize", a.resizeFix);
				z();
				b.paginationClickable && X();
				b.mousewheelControl && a._wheelEvent && c(a.container, a._wheelEvent, I);
				b.keyboardControl && c(document, "keydown", E);
				b.autoplay && a.stopAutoplay();
				a.callPlugins("onDestroy");
				a = null
			};
			a.disableKeyboardControl = function() {
				b.keyboardControl = !1;
				a.h.removeEventListener(document, "keydown", E)
			};
			a.enableKeyboardControl = function() {
				b.keyboardControl = !0;
				a.h.addEventListener(document, "keydown", E)
			};
			var U = (new Date).getTime();
			if (a.disableMousewheelControl = function() {
				return a._wheelEvent ? (b.mousewheelControl = !1, a.h.removeEventListener(a.container, a._wheelEvent, I), !0) : !1
			}, a.enableMousewheelControl = function() {
				return a._wheelEvent ? (b.mousewheelControl = !0, a.h.addEventListener(a.container, a._wheelEvent, I), !0) : !1
			}, b.grabCursor) y = a.container.style, y.cursor = "move", y.cursor = "grab", y.cursor = "-moz-grab", y.cursor = "-webkit-grab";
			a.allowSlideClick = !0;
			a.allowLinks = !0;
			var K, G, L, u = !1,
				J = !0;
			a.swipeNext = function(c) {
				!c && b.loop && a.fixLoop();
				!c && b.autoplay && a.stopAutoplay(!0);
				a.callPlugins("onSwipeNext");
				var d = c = a.getWrapperTranslate();
				if ("auto" === b.slidesPerView) for (var f = 0; f < a.snapGrid.length; f++) {
					if (-c >= a.snapGrid[f] && -c < a.snapGrid[f + 1]) {
						d = -a.snapGrid[f + 1];
						break
					}
				} else d = t * b.slidesPerGroup, d = -(Math.floor(Math.abs(c) / Math.floor(d)) * d + d);
				return d < -g() && (d = -g()), d === c ? !1 : (M(d, "next"), !0)
			};
			a.swipePrev = function(c) {
				!c && b.loop && a.fixLoop();
				!c && b.autoplay && a.stopAutoplay(!0);
				a.callPlugins("onSwipePrev");
				var d;
				c = Math.ceil(a.getWrapperTranslate());
				if ("auto" === b.slidesPerView) {
					d = 0;
					for (var f = 1; f < a.snapGrid.length; f++) {
						if (-c === a.snapGrid[f]) {
							d = -a.snapGrid[f - 1];
							break
						}
						if (-c > a.snapGrid[f] && -c < a.snapGrid[f + 1]) {
							d = -a.snapGrid[f];
							break
						}
					}
				} else d = t * b.slidesPerGroup, d *= -(Math.ceil(-c / d) - 1);
				return 0 < d && (d = 0), d === c ? !1 : (M(d, "prev"), !0)
			};
			a.swipeReset = function() {
				a.callPlugins("onSwipeReset");
				var c, d = a.getWrapperTranslate();
				c = t * b.slidesPerGroup; - g();
				if ("auto" === b.slidesPerView) {
					for (var f = c = 0; f < a.snapGrid.length; f++) {
						if (-d === a.snapGrid[f]) return;
						if (-d >= a.snapGrid[f] && -d < a.snapGrid[f + 1]) {
							c = 0 < a.positions.diff ? -a.snapGrid[f + 1] : -a.snapGrid[f];
							break
						}
					} - d >= a.snapGrid[a.snapGrid.length - 1] && (c = -a.snapGrid[a.snapGrid.length - 1])
				} else c = 0 > d ? Math.round(d / c) * c : 0;
				d <= -g() && (c = -g());
				return b.scrollContainer && (c = 0 > d ? d : 0), c < -g() && (c = -g()), b.scrollContainer && m > t && (c = 0), c === d ? !1 : (M(c, "reset"), !0)
			};
			a.swipeTo = function(c, d, f) {
				c = parseInt(c, 10);
				a.callPlugins("onSwipeTo", {
					index: c,
					speed: d
				});
				b.loop && (c += a.loopedSlides);
				var e = a.getWrapperTranslate();
				if (!(c > a.slides.length - 1 || 0 > c)) {
					var h;
					return h = "auto" === b.slidesPerView ? -a.slidesGrid[c] : -c * t, h < -g() && (h = -g()), h === e ? !1 : (f = !1 === f ? !1 : !0, M(h, "to", {
						index: c,
						speed: d,
						runCallbacks: f
					}), !0)
				}
			};
			a._queueStartCallbacks = !1;
			a._queueEndCallbacks = !1;
			a.updateActiveSlide = function(c) {
				if (a.initialized && 0 !== a.slides.length) {
					a.previousIndex = a.activeIndex;
					"undefined" == typeof c && (c = a.getWrapperTranslate());
					0 < c && (c = 0);
					var d;
					if ("auto" === b.slidesPerView) {
						if (a.activeIndex = a.slidesGrid.indexOf(-c), 0 > a.activeIndex) {
							for (d = 0; d < a.slidesGrid.length - 1 && !(-c > a.slidesGrid[d] && -c < a.slidesGrid[d + 1]); d++);
							a.activeIndex = Math.abs(a.slidesGrid[d + 1] + c) >= Math.abs(a.slidesGrid[d] + c) ? d : d + 1
						}
					} else a.activeIndex = Math[b.visibilityFullFit ? "ceil" : "round"](-c / t);
					if (a.activeIndex === a.slides.length && (a.activeIndex = a.slides.length - 1), 0 > a.activeIndex && (a.activeIndex = 0), a.slides[a.activeIndex]) {
						if (a.calcVisibleSlides(c), a.support.classList) {
							var e;
							for (d = 0; d < a.slides.length; d++) e = a.slides[d], e.classList.remove(b.slideActiveClass), 0 <= a.visibleSlides.indexOf(e) ? e.classList.add(b.slideVisibleClass) : e.classList.remove(b.slideVisibleClass);
							a.slides[a.activeIndex].classList.add(b.slideActiveClass)
						} else {
							e = new RegExp("\\s*" + b.slideActiveClass);
							var g = new RegExp("\\s*" + b.slideVisibleClass);
							for (d = 0; d < a.slides.length; d++) a.slides[d].className = a.slides[d].className.replace(e, "").replace(g, ""), 0 <= a.visibleSlides.indexOf(a.slides[d]) && (a.slides[d].className += " " + b.slideVisibleClass);
							a.slides[a.activeIndex].className += " " + b.slideActiveClass
						}
						b.loop ? (d = a.loopedSlides, a.activeLoopIndex = a.activeIndex - d, a.activeLoopIndex >= a.slides.length - 2 * d && (a.activeLoopIndex = a.slides.length - 2 * d - a.activeLoopIndex), 0 > a.activeLoopIndex && (a.activeLoopIndex = a.slides.length - 2 * d + a.activeLoopIndex), 0 > a.activeLoopIndex && (a.activeLoopIndex = 0)) : a.activeLoopIndex = a.activeIndex;
						b.pagination && a.updatePagination(c)
					}
				}
			};
			a.createPagination = function(c) {
				if (b.paginationClickable && a.paginationButtons && X(), a.paginationContainer = b.pagination.nodeType ? b.pagination : l(b.pagination)[0], b.createPagination) {
					var d = "",
						e = a.slides.length;
					b.loop && (e -= 2 * a.loopedSlides);
					for (var g = 0; e > g; g++) d += "<" + b.paginationElement + ' class="' + b.paginationElementClass + '"></' + b.paginationElement + ">";
					a.paginationContainer.innerHTML = d
				}
				a.paginationButtons = l("." + b.paginationElementClass, a.paginationContainer);
				c || a.updatePagination();
				a.callPlugins("onCreatePagination");
				if (b.paginationClickable && (c = a.paginationButtons)) for (d = 0; d < c.length; d++) a.h.addEventListener(c[d], "click", Y)
			};
			a.updatePagination = function(c) {
				if (b.pagination && !(1 > a.slides.length) && l("." + b.paginationActiveClass, a.paginationContainer)) {
					var d = a.paginationButtons;
					if (0 !== d.length) {
						for (var e = 0; e < d.length; e++) d[e].className = b.paginationElementClass;
						e = b.loop ? a.loopedSlides : 0;
						if (b.paginationAsRange) {
							a.visibleSlides || a.calcVisibleSlides(c);
							var g = [];
							for (c = 0; c < a.visibleSlides.length; c++) {
								var h = a.slides.indexOf(a.visibleSlides[c]) - e;
								b.loop && 0 > h && (h = a.slides.length - 2 * a.loopedSlides + h);
								b.loop && h >= a.slides.length - 2 * a.loopedSlides && (h = a.slides.length - 2 * a.loopedSlides - h, h = Math.abs(h));
								g.push(h)
							}
							for (c = 0; c < g.length; c++) d[g[c]] && (d[g[c]].className += " " + b.paginationVisibleClass);
							b.loop ? void 0 !== d[a.activeLoopIndex] && (d[a.activeLoopIndex].className += " " + b.paginationActiveClass) : d[a.activeIndex].className += " " + b.paginationActiveClass
						} else b.loop ? d[a.activeLoopIndex] && (d[a.activeLoopIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass) : d[a.activeIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass
					}
				}
			};
			a.calcVisibleSlides = function(c) {
				var d = [],
					e = 0,
					g = 0,
					h;
				n && 0 < a.wrapperLeft && (c += a.wrapperLeft);
				!n && 0 < a.wrapperTop && (c += a.wrapperTop);
				for (var k = 0; k < a.slides.length; k++) {
					e += g;
					g = "auto" === b.slidesPerView ? n ? a.h.getWidth(a.slides[k], !0, b.roundLengths) : a.h.getHeight(a.slides[k], !0, b.roundLengths) : t;
					h = e + g;
					var l = !1;
					b.visibilityFullFit ? (e >= -c && -c + m >= h && (l = !0), -c >= e && h >= -c + m && (l = !0)) : (h > -c && -c + m >= h && (l = !0), e >= -c && -c + m > e && (l = !0), -c > e && h > -c + m && (l = !0));
					l && d.push(a.slides[k])
				}
				0 === d.length && (d = [a.slides[a.activeIndex]]);
				a.visibleSlides = d
			};
			var r, w;
			a.startAutoplay = function() {
				if (a.support.transitions) {
					if ("undefined" != typeof r) return !1;
					b.autoplay && (a.callPlugins("onAutoplayStart"), b.onAutoplayStart && a.fireCallback(b.onAutoplayStart, a), P())
				} else {
					if ("undefined" != typeof w) return !1;
					b.autoplay && (a.callPlugins("onAutoplayStart"), b.onAutoplayStart && a.fireCallback(b.onAutoplayStart, a), w = setInterval(function() {
						b.loop ? (a.fixLoop(), a.swipeNext(!0)) : a.swipeNext(!0) || (b.autoplayStopOnLast ? (clearInterval(w), w = void 0) : a.swipeTo(0))
					}, b.autoplay))
				}
			};
			a.stopAutoplay = function(c) {
				if (a.support.transitions) {
					if (!r) return;
					r && clearTimeout(r);
					r = void 0;
					c && !b.autoplayDisableOnInteraction && a.wrapperTransitionEnd(function() {
						P()
					})
				} else w && clearInterval(w), w = void 0;
				a.callPlugins("onAutoplayStop");
				b.onAutoplayStop && a.fireCallback(b.onAutoplayStop, a)
			};
			a.loopCreated = !1;
			a.removeLoopedSlides = function() {
				if (a.loopCreated) for (var b = 0; b < a.slides.length; b++)!0 === a.slides[b].getData("looped") && a.wrapper.removeChild(a.slides[b])
			};
			a.createLoop = function() {
				if (0 !== a.slides.length) {
					a.loopedSlides = "auto" === b.slidesPerView ? b.loopedSlides || 1 : b.slidesPerView + b.loopAdditionalSlides;
					a.loopedSlides > a.slides.length && (a.loopedSlides = a.slides.length);
					var c, d = "",
						e = "",
						g = "",
						h = a.slides.length,
						k = Math.floor(a.loopedSlides / h),
						l = a.loopedSlides % h;
					for (c = 0; k * h > c; c++) {
						var m = c;
						c >= h && (m = c - h * Math.floor(c / h));
						g += a.slides[m].outerHTML
					}
					for (c = 0; l > c; c++) e += W(b.slideDuplicateClass, a.slides[c].outerHTML);
					for (c = h - l; h > c; c++) d += W(b.slideDuplicateClass, a.slides[c].outerHTML);
					N.innerHTML = d + g + N.innerHTML + g + e;
					a.loopCreated = !0;
					a.calcSlides();
					for (c = 0; c < a.slides.length; c++)(c < a.loopedSlides || c >= a.slides.length - a.loopedSlides) && a.slides[c].setData("looped", !0);
					a.callPlugins("onCreateLoop")
				}
			};
			a.fixLoop = function() {
				var c;
				a.activeIndex < a.loopedSlides ? (c = a.slides.length - 3 * a.loopedSlides + a.activeIndex, a.swipeTo(c, 0, !1)) : ("auto" === b.slidesPerView && a.activeIndex >= 2 * a.loopedSlides || a.activeIndex > a.slides.length - 2 * b.slidesPerView) && (c = -a.slides.length + a.activeIndex + a.loopedSlides, a.swipeTo(c, 0, !1))
			};
			a.loadSlides = function() {
				var c = "";
				a.activeLoaderIndex = 0;
				for (var d = b.loader.slides, e = b.loader.loadAllSlides ? d.length : b.slidesPerView * (1 + b.loader.surroundGroups), g = 0; e > g; g++) c += "outer" === b.loader.slidesHTMLType ? d[g] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + g + '">' + d[g] + "</" + b.slideElement + ">";
				a.wrapper.innerHTML = c;
				a.calcSlides(!0);
				b.loader.loadAllSlides || a.wrapperTransitionEnd(a.reloadSlides, !0)
			};
			a.reloadSlides = function() {
				var c = b.loader.slides,
					d = parseInt(a.activeSlide().data("swiperindex"), 10);
				if (!(0 > d || d > c.length - 1)) {
					a.activeLoaderIndex = d;
					var e = Math.max(0, d - b.slidesPerView * b.loader.surroundGroups),
						g = Math.min(d + b.slidesPerView * (1 + b.loader.surroundGroups) - 1, c.length - 1);
					0 < d && (a.setWrapperTranslate(-t * (d - e)), a.setWrapperTransition(0));
					if ("reload" === b.loader.logic) {
						for (var h = a.wrapper.innerHTML = "", d = e; g >= d; d++) h += "outer" === b.loader.slidesHTMLType ? c[d] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + d + '">' + c[d] + "</" + b.slideElement + ">";
						a.wrapper.innerHTML = h
					} else {
						for (var k = 1E3, l = 0, d = 0; d < a.slides.length; d++) {
							var m = a.slides[d].data("swiperindex");
							e > m || m > g ? a.wrapper.removeChild(a.slides[d]) : (k = Math.min(m, k), l = Math.max(m, l))
						}
						for (d = e; g >= d; d++) k > d && (h = document.createElement(b.slideElement), h.className = b.slideClass, h.setAttribute("data-swiperindex", d), h.innerHTML = c[d], a.wrapper.insertBefore(h, a.wrapper.firstChild)), d > l && (h = document.createElement(b.slideElement), h.className = b.slideClass, h.setAttribute("data-swiperindex", d), h.innerHTML = c[d], a.wrapper.appendChild(h))
					}
					a.reInit(!0)
				}
			};
			a.calcSlides();
			0 < b.loader.slides.length && 0 === a.slides.length && a.loadSlides();
			b.loop && a.createLoop();
			a.init();
			k();
			b.pagination && a.createPagination(!0);
			b.loop || 0 < b.initialSlide ? a.swipeTo(b.initialSlide, 0, !1) : a.updateActiveSlide(0);
			b.autoplay && a.startAutoplay();
			a.centerIndex = a.activeIndex;
			b.onSwiperCreated && a.fireCallback(b.onSwiperCreated, a);
			a.callPlugins("onSwiperCreated")
		}
	};
Swiper.prototype = {
	plugins: {},
	wrapperTransitionEnd: function(e, b) {
		function l(E) {
			if (E.target === p && (e(k), k.params.queueEndCallbacks && (k._queueEndCallbacks = !1), !b)) for (g = 0; g < z.length; g++) k.h.removeEventListener(p, z[g], l)
		}
		var g, k = this,
			p = k.wrapper,
			z = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
		if (e) for (g = 0; g < z.length; g++) k.h.addEventListener(p, z[g], l)
	},
	getWrapperTranslate: function(e) {
		var b, l, g, k, p = this.wrapper;
		return "undefined" == typeof e && (e = "horizontal" === this.params.mode ? "x" : "y"), this.support.transforms && this.params.useCSS3Transforms ? (g = window.getComputedStyle(p, null), window.WebKitCSSMatrix ? k = new WebKitCSSMatrix("none" === g.webkitTransform ? "" : g.webkitTransform) : (k = g.MozTransform || g.OTransform || g.MsTransform || g.msTransform || g.transform || g.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), b = k.toString().split(",")), "x" === e && (l = window.WebKitCSSMatrix ? k.m41 : parseFloat(16 === b.length ? b[12] : b[4])), "y" === e && (l = window.WebKitCSSMatrix ? k.m42 : parseFloat(16 === b.length ? b[13] : b[5]))) : ("x" === e && (l = parseFloat(p.style.left, 10) || 0), "y" === e && (l = parseFloat(p.style.top, 10) || 0)), l || 0
	},
	setWrapperTranslate: function(e, b, l) {
		var g, k = this.wrapper.style,
			p = {
				x: 0,
				y: 0,
				z: 0
			};
		3 === arguments.length ? (p.x = e, p.y = b, p.z = l) : ("undefined" == typeof b && (b = "horizontal" === this.params.mode ? "x" : "y"), p[b] = e);
		this.support.transforms && this.params.useCSS3Transforms ? (g = this.support.transforms3d ? "translate3d(" + p.x + "px, " + p.y + "px, " + p.z + "px)" : "translate(" + p.x + "px, " + p.y + "px)", k.webkitTransform = k.MsTransform = k.msTransform = k.MozTransform = k.OTransform = k.transform = g) : (k.left = p.x + "px", k.top = p.y + "px");
		this.callPlugins("onSetWrapperTransform", p);
		this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, p)
	},
	setWrapperTransition: function(e) {
		var b = this.wrapper.style;
		b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = e / 1E3 + "s";
		this.callPlugins("onSetWrapperTransition", {
			duration: e
		});
		this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, e)
	},
	h: {
		getWidth: function(e, b, l) {
			var g = window.getComputedStyle(e, null).getPropertyValue("width"),
				k = parseFloat(g);
			return (isNaN(k) || 0 < g.indexOf("%") || 0 > k) && (k = e.offsetWidth - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right"))), b && (k += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right"))), l ? Math.ceil(k) : k
		},
		getHeight: function(e, b, l) {
			if (b) return e.offsetHeight;
			var g = window.getComputedStyle(e, null).getPropertyValue("height"),
				k = parseFloat(g);
			return (isNaN(k) || 0 < g.indexOf("%") || 0 > k) && (k = e.offsetHeight - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom"))), b && (k += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom"))), l ? Math.ceil(k) : k
		},
		getOffset: function(e) {
			var b = e.getBoundingClientRect(),
				l = document.body,
				g = e.clientTop || l.clientTop || 0,
				l = e.clientLeft || l.clientLeft || 0,
				k = window.pageYOffset || e.scrollTop;
			e = window.pageXOffset || e.scrollLeft;
			return document.documentElement && !window.pageYOffset && (k = document.documentElement.scrollTop, e = document.documentElement.scrollLeft), {
				top: b.top + k - g,
				left: b.left + e - l
			}
		},
		windowWidth: function() {
			return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : void 0
		},
		windowHeight: function() {
			return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : void 0
		},
		windowScroll: function() {
			return "undefined" != typeof pageYOffset ? {
				left: window.pageXOffset,
				top: window.pageYOffset
			} : document.documentElement ? {
				left: document.documentElement.scrollLeft,
				top: document.documentElement.scrollTop
			} : void 0
		},
		addEventListener: function(e, b, l, g) {
			"undefined" == typeof g && (g = !1);
			e.addEventListener ? e.addEventListener(b, l, g) : e.attachEvent && e.attachEvent("on" + b, l)
		},
		removeEventListener: function(e, b, l, g) {
			"undefined" == typeof g && (g = !1);
			e.removeEventListener ? e.removeEventListener(b, l, g) : e.detachEvent && e.detachEvent("on" + b, l)
		}
	},
	setTransform: function(e, b) {
		e = e.style;
		e.webkitTransform = e.MsTransform = e.msTransform = e.MozTransform = e.OTransform = e.transform = b
	},
	setTranslate: function(e, b) {
		e = e.style;
		var l = b.x || 0,
			g = b.y || 0;
		b = b.z || 0;
		e.webkitTransform = e.MsTransform = e.msTransform = e.MozTransform = e.OTransform = e.transform = this.support.transforms3d ? "translate3d(" + l + "px," + g + "px," + b + "px)" : "translate(" + l + "px," + g + "px)";
		this.support.transforms || (e.left = l + "px", e.top = g + "px")
	},
	setTransition: function(e, b) {
		e = e.style;
		e.webkitTransitionDuration = e.MsTransitionDuration = e.msTransitionDuration = e.MozTransitionDuration = e.OTransitionDuration = e.transitionDuration = b + "ms"
	},
	support: {
		touch: window.Modernizr && !0 === Modernizr.touch ||
		function() {
			return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
		}(),
		transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d ||
		function() {
			var e = document.createElement("div").style;
			return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
		}(),
		transforms: window.Modernizr && !0 === Modernizr.csstransforms ||
		function() {
			var e = document.createElement("div").style;
			return "transform" in e || "WebkitTransform" in e || "MozTransform" in e || "msTransform" in e || "MsTransform" in e || "OTransform" in e
		}(),
		transitions: window.Modernizr && !0 === Modernizr.csstransitions ||
		function() {
			var e = document.createElement("div").style;
			return "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "MsTransition" in e || "OTransition" in e
		}(),
		classList: function() {
			return "classList" in document.createElement("div")
		}()
	},
	browser: {
		ie8: function() {
			var e = -1;
			"Microsoft Internet Explorer" === navigator.appName && null !== (new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/)).exec(navigator.userAgent) && (e = parseFloat(RegExp.$1));
			return -1 !== e && 9 > e
		}(),
		ie10: window.navigator.msPointerEnabled,
		ie11: window.navigator.pointerEnabled
	}
};
(window.jQuery || window.Zepto) && !
function(e) {
	e.fn.swiper = function(b) {
		var l;
		return this.each(function(g) {
			var k = e(this);
			if (!k.data("swiper")) {
				var p = new Swiper(k[0], b);
				g || (l = p);
				k.data("swiper", p)
			}
		}), l
	}
}(window.jQuery || window.Zepto);
"undefined" != typeof module && (module.exports = Swiper);
"function" == typeof define && define.amd && define([], function() {
	return Swiper
});