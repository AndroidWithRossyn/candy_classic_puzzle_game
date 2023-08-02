
var _SETTINGS = {
    Language: {
        Default: "en"
    },
    MoreGames: {
        Enabled: true,
        Link: ""
    },
    Gamecenter: {
        Enabled: true
    }
};
var portraitMode = true,
    mobilePortraitWidth = 480,
    mobilePortraitHeight = 640,
    mobileLandscapeWidth = 640,
    mobileLandscapeHeight = 480,
    mobileWidth = portraitMode ? mobilePortraitWidth : mobileLandscapeWidth,
    mobileHeight = portraitMode ? mobilePortraitHeight : mobileLandscapeHeight,
    desktopWidth = 480,
    desktopHeight = 640,
    w, h, multiplier, destW, destH, dynamicClickableEntityDivs = {},
    coreDivsToResize = ["game", "play", "orientate"],
    advancedDivsToResize = {
        
    };

function adjustLayers(b) {
    for (i = 0; i < coreDivsToResize.length; i++) ig.ua.mobile ? ($("#" + coreDivsToResize[i]).width(w), $("#" + coreDivsToResize[i]).height(h)) : ($("#" + coreDivsToResize[i]).width(destW), $("#" + coreDivsToResize[i]).height(destH), $("#" + coreDivsToResize[i]).css("left", b ? 0 : w / 2 - destW / 2));
    
    $("#ajaxbar").width(w);
    $("#ajaxbar").height(h)
}

function sizeHandler() {
    $("#game") && (w = window.innerWidth, h = window.innerHeight, ig.ua.mobile ? (multiplier = Math.min(h / mobileHeight, w / mobileWidth), destW = mobileWidth * multiplier, destH = mobileHeight * multiplier) : (multiplier = Math.min(h / desktopHeight, w / desktopWidth), destW = desktopWidth * multiplier, destH = desktopHeight * multiplier), widthRatio = window.innerWidth / mobileWidth, heightRatio = window.innerHeight / mobileHeight, adjustLayers(), window.scrollTo(0, 1))
}

function orientationHandler() {
    console.log("changing orientation ...");
    ig.ua.mobile && ((portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth) ? ($("#orientate").show(), $("#game").hide()) : ($("#orientate").hide(), $("#game").show()));
    sizeHandler()
}

function fixSamsungHandler() {
    ig.ua.android && !(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && (!(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox"))) && (document.addEventListener("touchstart", function(b) {
        b.preventDefault();
        return !1
    }, !1), document.addEventListener("touchmove", function(b) {
        b.preventDefault();
        return !1
    }, !1), document.addEventListener("touchend",
        function(b) {
            b.preventDefault();
            return !1
        }, !1))
}
window.addEventListener("resize", function() {
    orientationHandler()
}, !1);
window.addEventListener("orientationchange", function() {
    orientationHandler()
}, !1);
document.ontouchmove = function() {
    window.scrollTo(0, 1)
};

function getInternetExplorerVersion() {
    var b = -1;
    "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
    return b
}
var ie = getInternetExplorerVersion();

function getQueryVariable(b) {
    for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
        var f = c[d].split("=");
        if (decodeURIComponent(f[0]) == b) return decodeURIComponent(f[1])
    }
}

(function(b) {
    Number.prototype.map = function(b, c, d, f) {
        return d + (f - d) * ((this - b) / (c - b))
    };
    Number.prototype.limit = function(b, c) {
        return Math.min(c, Math.max(b, this))
    };
    Number.prototype.round = function(b) {
        b = Math.pow(10, b || 0);
        return Math.round(this * b) / b
    };
    Number.prototype.floor = function() {
        return Math.floor(this)
    };
    Number.prototype.ceil = function() {
        return Math.ceil(this)
    };
    Number.prototype.toInt = function() {
        return this | 0
    };
    Number.prototype.toRad = function() {
        return this / 180 * Math.PI
    };
    Number.prototype.toDeg = function() {
        return 180 *
            this / Math.PI
    };
    Array.prototype.erase = function(b) {
        for (var c = this.length; c--;) this[c] === b && this.splice(c, 1);
        return this
    };
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)]
    };
    Function.prototype.bind = Function.prototype.bind || function(b) {
        var c = this;
        return function() {
            var d = Array.prototype.slice.call(arguments);
            return c.apply(b || null, d)
        }
    };
    b.ig = {
        game: null,
        debug: null,
        version: "1.20",
        global: b,
        modules: {},
        resources: [],
        ready: !1,
        baked: !1,
        nocache: "",
        ua: {},
        prefix: b.ImpactPrefix || "",
        lib: "lib/",
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function(b) {
            return "#" == b.charAt(0) ? document.getElementById(b.substr(1)) : document.getElementsByTagName(b)
        },
        $new: function(b) {
            return document.createElement(b)
        },
        copy: function(b) {
            if (!b || "object" != typeof b || b instanceof HTMLElement || b instanceof ig.Class) return b;
            if (b instanceof Array)
                for (var c = [], d = 0, f = b.length; d < f; d++) c[d] = ig.copy(b[d]);
            else
                for (d in c = {}, b) c[d] = ig.copy(b[d]);
            return c
        },
        merge: function(b, c) {
            for (var d in c) {
                var f = c[d];
                if ("object" !=
                    typeof f || f instanceof HTMLElement || f instanceof ig.Class) b[d] = f;
                else {
                    if (!b[d] || "object" != typeof b[d]) b[d] = f instanceof Array ? [] : {};
                    ig.merge(b[d], f)
                }
            }
            return b
        },
        ksort: function(b) {
            if (!b || "object" != typeof b) return [];
            var c = [],
                d = [],
                f;
            for (f in b) c.push(f);
            c.sort();
            for (f = 0; f < c.length; f++) d.push(b[c[f]]);
            return d
        },
        setVendorAttribute: function(b, c, d) {
            var f = c.charAt(0).toUpperCase() + c.substr(1);
            b[c] = b["ms" + f] = b["webkit" + f] = b["o" + f] = d
        },
        getVendorAttribute: function(b, c) {
            var d = c.charAt(0).toUpperCase() +
                c.substr(1);
            return b[c] || b["ms" + d] || b["webkit" + d] || b["o" + d]
        },
        normalizeVendorAttribute: function(b, c) {
            var d = ig.getVendorAttribute(b, c);
            !b[c] && d && (b[c] = d)
        },
        getImagePixels: function(b, c, d, f, g) {
            var l = ig.$new("canvas");
            l.width = b.width;
            l.height = b.height;
            var p = l.getContext("2d");
            ig.System.SCALE.CRISP(l, p);
            var x = ig.getVendorAttribute(p, "backingStorePixelRatio") || 1;
            ig.normalizeVendorAttribute(p, "getImageDataHD");
            var F = b.width / x,
                E = b.height / x;
            l.width = Math.ceil(F);
            l.height = Math.ceil(E);
            p.drawImage(b,
                0, 0, F, E);
            return 1 === x ? p.getImageData(c, d, f, g) : p.getImageDataHD(c, d, f, g)
        },
        module: function(b) {
            if (ig._current) throw "Module '" + ig._current.name + "' defines nothing";
            if (ig.modules[b] && ig.modules[b].body) throw "Module '" + b + "' is already defined";
            ig._current = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig.modules[b] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig
        },
        requires: function() {
            ig._current.requires = Array.prototype.slice.call(arguments);
            return ig
        },
        defines: function(b) {
            ig._current.body = b;
            ig._current =
                null;
            ig._initDOMReady()
        },
        addResource: function(b) {
            ig.resources.push(b)
        },
        setNocache: function(b) {
            ig.nocache = b ? "?" + Date.now() : ""
        },
        log: function() {},
        assert: function() {},
        show: function() {},
        mark: function() {},
        _loadScript: function(b, c) {
            ig.modules[b] = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig._waitForOnload++;
            var d = ig.prefix + ig.lib + b.replace(/\./g, "/") + ".js" + ig.nocache,
                f = ig.$new("script");
            f.type = "text/javascript";
            f.src = d;
            f.onload = function() {
                ig._waitForOnload--;
                ig._execModules()
            };
            f.onerror = function() {
                throw "Failed to load module " +
                    b + " at " + d + " required from " + c;
            };
            ig.$("head")[0].appendChild(f)
        },
        _execModules: function() {
            for (var b = !1, c = 0; c < ig._loadQueue.length; c++) {
                for (var d = ig._loadQueue[c], f = !0, g = 0; g < d.requires.length; g++) {
                    var l = d.requires[g];
                    ig.modules[l] ? ig.modules[l].loaded || (f = !1) : (f = !1, ig._loadScript(l, d.name))
                }
                f && d.body && (ig._loadQueue.splice(c, 1), d.loaded = !0, d.body(), b = !0, c--)
            }
            if (b) ig._execModules();
            else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
                b = [];
                for (c = 0; c < ig._loadQueue.length; c++) {
                    f = [];
                    l = ig._loadQueue[c].requires;
                    for (g = 0; g < l.length; g++) d = ig.modules[l[g]], (!d || !d.loaded) && f.push(l[g]);
                    b.push(ig._loadQueue[c].name + " (requires: " + f.join(", ") + ")")
                }
                throw "Unresolved (circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules:\n" + b.join("\n");
            }
        },
        _DOMReady: function() {
            if (!ig.modules["dom.ready"].loaded) {
                if (!document.body) return setTimeout(ig._DOMReady, 13);
                ig.modules["dom.ready"].loaded = !0;
                ig._waitForOnload--;
                ig._execModules()
            }
            return 0
        },
        _boot: function() {
            document.location.href.match(/\?nocache/) &&
                ig.setNocache(!0);
            ig.ua.pixelRatio = b.devicePixelRatio || 1;
            ig.ua.viewport = {
                width: b.innerWidth,
                height: b.innerHeight
            };
            ig.ua.screen = {
                width: b.screen.availWidth * ig.ua.pixelRatio,
                height: b.screen.availHeight * ig.ua.pixelRatio
            };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio;
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
            ig.ua.is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent);
            ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag;
            ig.ua.iOSgt5 = ig.ua.iOS && 5 < parseInt(navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]);
            ig.ua.HTCONE = /HTC_One/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.Kindle = /Silk/i.test(navigator.userAgent);
            ig.ua.touchDevice = "ontouchstart" in
                b || b.navigator.msMaxTouchPoints;
            ig.ua.mobile = true;ig.ua.iOS || ig.ua.android || ig.ua.iOS6 || ig.ua.winPhone || ig.ua.Kindle || /mobile/i.test(navigator.userAgent)
        },
        _initDOMReady: function() {
            ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(), ig.modules["dom.ready"] = {
                requires: [],
                loaded: !1,
                body: null
            }, ig._waitForOnload++, "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1), b.addEventListener("load", ig._DOMReady, !1)))
        }
    };
    for (var c = ["ms", "moz", "webkit", "o"],
            d = 0; d < c.length && !b.requestAnimationFrame; d++) b.requestAnimationFrame = b[c[d] + "RequestAnimationFrame"];
    if (b.requestAnimationFrame) {
        var f = 1,
            g = {};
        b.ig.setAnimation = function(c, d) {
            var l = f++;
            g[l] = !0;
            var j = function() {
                g[l] && (b.requestAnimationFrame(j, d), c())
            };
            b.requestAnimationFrame(j, d);
            return l
        };
        b.ig.clearAnimation = function(b) {
            delete g[b]
        }
    } else b.ig.setAnimation = function(c) {
        return b.setInterval(c, 1E3 / 60)
    }, b.ig.clearAnimation = function(c) {
        b.clearInterval(c)
    };
    var l = !1,
        p = /xyz/.test(function() {
            xyz
        }) ? /\bparent\b/ :
        /.*/;
    b.ig.Class = function() {};
    var x = function(b) {
        var c = this.prototype,
            d = {},
            f;
        for (f in b) "function" == typeof b[f] && "function" == typeof c[f] && p.test(b[f]) ? (d[f] = c[f], c[f] = function(b, c) {
            return function() {
                var f = this.parent;
                this.parent = d[b];
                var g = c.apply(this, arguments);
                this.parent = f;
                return g
            }
        }(f, b[f])) : c[f] = b[f]
    };
    b.ig.Class.extend = function(c) {
        function d() {
            if (!l) {
                if (this.staticInstantiate) {
                    var b = this.staticInstantiate.apply(this, arguments);
                    if (b) return b
                }
                for (var c in this) "object" == typeof this[c] && (this[c] =
                    ig.copy(this[c]));
                this.init && this.init.apply(this, arguments)
            }
            return this
        }
        var f = this.prototype;
        l = !0;
        var g = new this;
        l = !1;
        for (var m in c) g[m] = "function" == typeof c[m] && "function" == typeof f[m] && p.test(c[m]) ? function(b, c) {
            return function() {
                var d = this.parent;
                this.parent = f[b];
                var g = c.apply(this, arguments);
                this.parent = d;
                return g
            }
        }(m, c[m]) : c[m];
        d.prototype = g;
        d.constructor = d;
        d.extend = b.ig.Class.extend;
        d.inject = x;
        return d
    }
})(window);
ig.baked = !0;
ig.module("impact.image").defines(function() {
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: !1,
        failed: !1,
        loadCallback: null,
        path: "",
        staticInstantiate: function(b) {
            return ig.Image.cache[b] || null
        },
        init: function(b) {
            this.path = b;
            this.load()
        },
        load: function(b) {
            this.loaded ? b && b(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = b || null, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.onerror = this.onerror.bind(this), this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this),
                ig.Image.cache[this.path] = this)
        },
        reload: function() {
            this.loaded = !1;
            this.data = new Image;
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + "?" + Date.now()
        },
        onload: function() {
            this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = !0;
            1 != ig.system.scale && this.resize(ig.system.scale);
            this.loadCallback && this.loadCallback(this.path, !0)
        },
        onerror: function() {
            this.failed = !0;
            this.loadCallback && this.loadCallback(this.path, !1)
        },
        resize: function(b) {
            var c = this.width * b,
                d = this.height * b,
                f = ig.$new("canvas");
            f.width = this.width;
            f.height = this.height;
            f = f.getContext("2d");
            f.drawImage(this.data, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
            var f = f.getImageData(0, 0, this.width, this.height),
                g = ig.$new("canvas");
            g.width = c;
            g.height = d;
            for (var l = g.getContext("2d"), p = l.getImageData(0, 0, c, d), x = 0; x < d; x++)
                for (var s = 0; s < c; s++) {
                    var y = 4 * (Math.floor(x / b) * this.width + Math.floor(s / b)),
                        u = 4 * (x * c + s);
                    p.data[u] = f.data[y];
                    p.data[u + 1] = f.data[y + 1];
                    p.data[u + 2] = f.data[y + 2];
                    p.data[u + 3] = f.data[y + 3]
                }
            l.putImageData(p, 0, 0);
            this.data =
                g
        },
        draw: function(b, c, d, f, g, l) {
            if (this.loaded) {
                var p = ig.system.scale;
                g = (g ? g : this.width) * p;
                l = (l ? l : this.height) * p;
                ig.system.context.drawImage(this.data, d ? d * p : 0, f ? f * p : 0, g, l, ig.system.getDrawPos(b), ig.system.getDrawPos(c), g, l);
                ig.Image.drawCount++
            }
        },
        drawTile: function(b, c, d, f, g, l, p) {
            g = g ? g : f;
            if (this.loaded && !(f > this.width || g > this.height)) {
                var x = ig.system.scale,
                    s = Math.floor(f * x),
                    y = Math.floor(g * x),
                    u = l ? -1 : 1,
                    j = p ? -1 : 1;
                if (l || p) ig.system.context.save(), ig.system.context.scale(u, j);
                ig.system.context.drawImage(this.data,
                    Math.floor(d * f) % this.width * x, Math.floor(d * f / this.width) * g * x, s, y, ig.system.getDrawPos(b) * u - (l ? s : 0), ig.system.getDrawPos(c) * j - (p ? y : 0), s, y);
                (l || p) && ig.system.context.restore();
                ig.Image.drawCount++
            }
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function() {
        for (var b in ig.Image.cache) ig.Image.cache[b].reload()
    }
});
ig.baked = !0;
ig.module("impact.font").requires("impact.image").defines(function() {
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function(b) {
            this._loadMetrics(this.data);
            this.parent(b)
        },
        widthForString: function(b) {
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var c = 0, d = 0; d < b.length; d++) c = Math.max(c, this._widthForLine(b[d]));
                return c
            }
            return this._widthForLine(b)
        },
        _widthForLine: function(b) {
            for (var c = 0, d = 0; d < b.length; d++) c += this.widthMap[b.charCodeAt(d) - this.firstChar] +
                this.letterSpacing;
            return c
        },
        heightForString: function(b) {
            return b.split("\n").length * (this.height + this.lineSpacing)
        },
        draw: function(b, c, d, f) {
            "string" != typeof b && (b = b.toString());
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var g = this.height + this.lineSpacing, l = 0; l < b.length; l++) this.draw(b[l], c, d + l * g, f)
            } else {
                if (f == ig.Font.ALIGN.RIGHT || f == ig.Font.ALIGN.CENTER) l = this._widthForLine(b), c -= f == ig.Font.ALIGN.CENTER ? l / 2 : l;
                1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha);
                for (l = 0; l < b.length; l++) f = b.charCodeAt(l),
                    c += this._drawChar(f - this.firstChar, c, d);
                1 !== this.alpha && (ig.system.context.globalAlpha = 1);
                ig.Image.drawCount += b.length
            }
        },
        _drawChar: function(b, c, d) {
            if (!this.loaded || 0 > b || b >= this.indices.length) return 0;
            var f = ig.system.scale,
                g = this.widthMap[b] * f,
                l = (this.height - 2) * f;
            ig.system.context.drawImage(this.data, this.indices[b] * f, 0, g, l, ig.system.getDrawPos(c), ig.system.getDrawPos(d), g, l);
            return this.widthMap[b] + this.letterSpacing
        },
        _loadMetrics: function(b) {
            this.height = b.height - 1;
            this.widthMap = [];
            this.indices = [];
            for (var c = ig.getImagePixels(b, 0, b.height - 1, b.width, 1), d = 0, f = 0, g = 0; g < b.width; g++) {
                var l = 4 * g + 3;
                200 <= c.data[l] ? f++ : 20 >= c.data[l] && f && (this.widthMap.push(f), this.indices.push(g - f), d++, f = 0)
            }
            this.widthMap.push(f);
            this.indices.push(g - f)
        }
    });
    ig.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    }
});
ig.baked = !0;
ig.module("impact.sound").defines(function() {
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function() {
            for (var b = new Audio, c = 0; c < ig.Sound.use.length; c++) {
                var d = ig.Sound.use[c];
                if (b.canPlayType(d.mime)) {
                    this.format = d;
                    break
                }
            }
            this.format || (ig.Sound.enabled = !1)
        },
        load: function(b, c, d) {
            var f = ig.prefix + b.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[b]) {
                if (c && this.clips[b].length < ig.Sound.channels)
                    for (c = this.clips[b].length; c < ig.Sound.channels; c++) {
                        var g = new Audio(f);
                        g.load();
                        this.clips[b].push(g)
                    }
                return this.clips[b][0]
            }
            var l = new Audio(f);
            d && (l.addEventListener("canplaythrough", function x(c) {
                l.removeEventListener("canplaythrough", x, !1);
                d(b, !0, c)
            }, !1), l.addEventListener("error", function(c) {
                d(b, !0, c)
            }, !1));
            l.preload = "auto";
            l.load();
            this.clips[b] = [l];
            if (c)
                for (c = 1; c < ig.Sound.channels; c++) g = new Audio(f), g.load(), this.clips[b].push(g);
            return l
        },
        get: function(b) {
            b = this.clips[b];
            for (var c = 0, d; d = b[c++];)
                if (d.paused || d.ended) return d.ended && (d.currentTime = 0), d;
            b[0].pause();
            b[0].currentTime =
                0;
            return b[0]
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: !1,
        _volume: 1,
        _loop: !1,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function() {
            this._endedCallbackBound = this._endedCallback.bind(this);
            Object.defineProperty ? (Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                }), Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                })) : this.__defineGetter__ &&
                (this.__defineGetter__("volume", this.getVolume.bind(this)), this.__defineSetter__("volume", this.setVolume.bind(this)), this.__defineGetter__("loop", this.getLooping.bind(this)), this.__defineSetter__("loop", this.setLooping.bind(this)))
        },
        add: function(b, c) {
            if (ig.Sound.enabled) {
                var d = ig.soundManager.load(b instanceof ig.Sound ? b.path : b, !1);
                d.loop = this._loop;
                d.volume = this._volume;
                d.addEventListener("ended", this._endedCallbackBound, !1);
                this.tracks.push(d);
                c && (this.namedTracks[c] = d);
                this.currentTrack || (this.currentTrack =
                    d)
            }
        },
        next: function() {
            this.tracks.length && (this.stop(), this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length, this.currentTrack = this.tracks[this.currentIndex], this.play())
        },
        pause: function() {
            this.currentTrack && this.currentTrack.pause()
        },
        stop: function() {
            if (this.currentTrack) {
                this.currentTrack.pause();
                try {
                    this.currentTrack.currentTime = 0
                } catch (b) {
                    console.log(b)
                }
            }
        },
        play: function(b) {
            if (b && this.namedTracks[b]) b = this.namedTracks[b], b != this.currentTrack &&
                (this.stop(), this.currentTrack = b);
            else if (!this.currentTrack) return;
            this.currentTrack.play()
        },
        getLooping: function() {
            return this._loop
        },
        setLooping: function(b) {
            this._loop = b;
            for (var c in this.tracks) this.tracks[c].loop = b
        },
        getVolume: function() {
            return this._volume
        },
        setVolume: function(b) {
            this._volume = b.limit(0, 1);
            for (var c in this.tracks) this.tracks[c].volume = this._volume
        },
        fadeOut: function(b) {
            this.currentTrack && (clearInterval(this._fadeInterval), this.fadeTimer = new ig.Timer(b), this._fadeInterval = setInterval(this._fadeStep.bind(this),
                50))
        },
        _fadeStep: function() {
            var b = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            0.01 >= b ? (this.stop(), this.currentTrack.volume = this._volume, clearInterval(this._fadeInterval)) : this.currentTrack.volume = b
        },
        _endedCallback: function() {
            this._loop ? this.play() : this.next()
        }
    });
    ig.Sound = ig.Class.extend({
        path: "",
        volume: 1,
        currentClip: null,
        multiChannel: !0,
        init: function(b, c) {
            this.path = b;
            this.multiChannel = !1 !== c;
            this.load()
        },
        load: function(b) {
            ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path,
                this.multiChannel, b) : ig.addResource(this) : b && b(this.path, !0)
        },
        play: function() {
            ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path), this.currentClip.volume = ig.soundManager.volume * this.volume, this.currentClip.play())
        },
        stop: function() {
            this.currentClip && (this.currentClip.pause(), this.currentClip.currentTime = 0)
        }
    });
    ig.Sound.FORMAT = {
        MP3: {
            ext: "mp3",
            mime: "sounds/mpeg"
        },
        M4A: {
            ext: "m4a",
            mime: "sounds/mp4; codecs=mp4a"
        },
        OGG: {
            ext: "ogg",
            mime: "sounds/ogg; codecs=vorbis"
        },
        WEBM: {
            ext: "webm",
            mime: "sounds/webm; codecs=vorbis"
        },
        CAF: {
            ext: "caf",
            mime: "sounds/x-caf"
        }
    };
    ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG];
    ig.Sound.channels = 4;
    ig.Sound.enabled = !0
});
ig.baked = !0;
ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: !1,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function(b, c) {
            this.gameClass = b;
            this.resources = c;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var d = 0; d < this.resources.length; d++) this._unloaded.push(this.resources[d].path)
        },
        load: function() {
            ig.system.clear("#000");
            if (this.resources.length) {
                for (var b =
                        0; b < this.resources.length; b++) this.loadResource(this.resources[b]);
                this._intervalId = setInterval(this.draw.bind(this), 16)
            } else this.end()
        },
        loadResource: function(b) {
            b.load(this._loadCallbackBound)
        },
        end: function() {
            this.done || (this.done = !0, clearInterval(this._intervalId))
        },
        draw: function() {},
        _loadCallback: function(b, c) {
            if (c) this._unloaded.erase(b);
            else throw "Failed to load resource: " + b;
            this.status = 1 - this._unloaded.length / this.resources.length;
            0 == this._unloaded.length && setTimeout(this.end.bind(this), 250)
        }
    })
});
ig.baked = !0;
ig.module("impact.timer").defines(function() {
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function(b) {
            this.last = this.base = ig.Timer.time;
            this.target = b || 0
        },
        set: function(b) {
            this.target = b || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        reset: function() {
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        tick: function() {
            var b = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return this.pausedAt ? 0 : b
        },
        delta: function() {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target
        },
        pause: function() {
            this.pausedAt || (this.pausedAt =
                ig.Timer.time)
        },
        unpause: function() {
            this.pausedAt && (this.base += ig.Timer.time - this.pausedAt, this.pausedAt = 0)
        }
    });
    ig.Timer._last = 0;
    ig.Timer.time = 0;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function() {
        var b = Date.now();
        ig.Timer.time += Math.min((b - ig.Timer._last) / 1E3, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = b
    }
});
ig.baked = !0;
ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
    ig.System = ig.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        animationId: 0,
        newGameClass: null,
        running: !1,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function(b, c, d, f, g) {
            this.fps = c;
            this.clock = new ig.Timer;
            this.canvas = ig.$(b);
            this.resize(d, f, g);
            this.context = this.canvas.getContext("2d");
            this.getDrawPos = ig.System.drawMode
        },
        resize: function(b, c, d) {
            this.width = b;
            this.height =
                c;
            this.scale = d || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight
        },
        setGame: function(b) {
            this.running ? this.newGameClass = b : this.setGameNow(b)
        },
        setGameNow: function(b) {
            ig.game = new b;
            ig.system.setDelegate(ig.game)
        },
        setDelegate: function(b) {
            if ("function" == typeof b.run) this.delegate = b, this.startRunLoop();
            else throw "System.setDelegate: No run() function in object";
        },
        stopRunLoop: function() {
            ig.clearAnimation(this.animationId);
            this.running = !1
        },
        startRunLoop: function() {
            this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = !0
        },
        clear: function(b) {
            this.context.fillStyle = b;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight)
        },
        run: function() {
            ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            this.newGameClass && (this.setGameNow(this.newGameClass), this.newGameClass = null)
        },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function(b) {
            return Math.round(b) *
                this.scale
        },
        SMOOTH: function(b) {
            return Math.round(b * this.scale)
        },
        SUBPIXEL: function(b) {
            return b * this.scale
        }
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.System.SCALE = {
        CRISP: function(b, c) {
            ig.setVendorAttribute(c, "imageSmoothingEnabled", !1);
            b.style.imageRendering = "-moz-crisp-edges";
            b.style.imageRendering = "-o-crisp-edges";
            b.style.imageRendering = "-webkit-optimize-contrast";
            b.style.imageRendering = "crisp-edges";
            b.style.msInterpolationMode = "nearest-neighbor"
        },
        SMOOTH: function(b, c) {
            ig.setVendorAttribute(c, "imageSmoothingEnabled", !0);
            b.style.imageRendering = "";
            b.style.msInterpolationMode = ""
        }
    };
    ig.System.scaleMode = ig.System.SCALE.SMOOTH
});
ig.baked = !0;
ig.module("impact.input").defines(function() {
    ig.KEY = {
        MOUSE1: -1,
        MOUSE2: -3,
        MWHEEL_UP: -4,
        MWHEEL_DOWN: -5,
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        PAUSE: 19,
        CAPS: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        _0: 48,
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        _6: 54,
        _7: 55,
        _8: 56,
        _9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: !1,
        isUsingKeyboard: !1,
        isUsingAccelerometer: !1,
        mouse: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0,
            z: 0
        },
        initMouse: function() {
            if (!this.isUsingMouse) {
                this.isUsingMouse = !0;
                var b = this.mousewheel.bind(this);
                ig.system.canvas.addEventListener("mousewheel", b, !1);
                ig.system.canvas.addEventListener("DOMMouseScroll", b, !1);
                ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1);
                ig.system.canvas.addEventListener("mousedown", this.keydown.bind(this), !1);
                ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1);
                ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1);
                ig.ua.touchDevice && (ig.system.canvas.addEventListener("touchstart",
                    this.keydown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1), ig.system.canvas.addEventListener("MSPointerDown", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.mousemove.bind(this), !1), ig.system.canvas.style.msTouchAction = "none")
            }
        },
        initKeyboard: function() {
            this.isUsingKeyboard || (this.isUsingKeyboard = !0, window.addEventListener("keydown", this.keydown.bind(this), !1), window.addEventListener("keyup", this.keyup.bind(this), !1))
        },
        initAccelerometer: function() {
            this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1)
        },
        mousewheel: function(b) {
            var c = this.bindings[0 < (b.wheelDelta ? b.wheelDelta : -1 * b.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
            c && (this.actions[c] = !0, this.presses[c] = !0, this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault())
        },
        mousemove: function(b) {
            for (var c =
                    ig.system.canvas, d = 0, f = 0; null != c;) d += c.offsetLeft, f += c.offsetTop, c = c.offsetParent;
            var c = b.pageX,
                g = b.pageY;
            b.touches && (c = b.touches[0].clientX, g = b.touches[0].clientY);
            this.mouse.x = (c - d) / ig.system.scale;
            this.mouse.y = (g - f) / ig.system.scale
        },
        contextmenu: function(b) {
            this.bindings[ig.KEY.MOUSE2] && (b.stopPropagation(), b.preventDefault())
        },
        keydown: function(b) {
            if ("text" != b.target.type) {
                var c = "keydown" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1;
                ("touchstart" == b.type || "mousedown" == b.type) && this.mousemove(b);
                if (c = this.bindings[c]) this.actions[c] = !0, this.locks[c] || (this.presses[c] = !0, this.locks[c] = !0), b.stopPropagation(), b.preventDefault()
            }
        },
        keyup: function(b) {
            if ("text" != b.target.type) {
                var c = this.bindings["keyup" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1];
                c && (this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault())
            }
        },
        devicemotion: function(b) {
            this.accel = b.accelerationIncludingGravity
        },
        bind: function(b, c) {
            0 > b ? this.initMouse() : 0 < b && this.initKeyboard();
            this.bindings[b] = c
        },
        bindTouch: function(b,
            c) {
            var d = ig.$(b),
                f = this;
            d.addEventListener("touchstart", function(b) {
                f.touchStart(b, c)
            }, !1);
            d.addEventListener("touchend", function(b) {
                f.touchEnd(b, c)
            }, !1)
        },
        unbind: function(b) {
            this.delayedKeyup[this.bindings[b]] = !0;
            this.bindings[b] = null
        },
        unbindAll: function() {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {}
        },
        state: function(b) {
            return this.actions[b]
        },
        pressed: function(b) {
            return this.presses[b]
        },
        released: function(b) {
            return this.delayedKeyup[b]
        },
        clearPressed: function() {
            for (var b in this.delayedKeyup) this.actions[b] = !1, this.locks[b] = !1;
            this.delayedKeyup = {};
            this.presses = {}
        },
        touchStart: function(b, c) {
            this.actions[c] = !0;
            this.presses[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        },
        touchEnd: function(b, c) {
            this.delayedKeyup[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        }
    })
});
ig.baked = !0;
ig.module("impact.sound-handler").defines(function() {
    ig.SoundHandler = ig.Class.extend({
        formats: {
            ogg: ".ogg",
            mp3: ".mp3"
        },
        jukebox: null,
        pausePosition: null,
        globalMute: !1,
        forceMuted: !1,
        muted: !1,
        bgmPlaying: !1,
        soundPlaying: !1,
        currentSoundPlaying: null,
        soundBuffer: [],
        voSoundLoaded: [],
        sfxSoundLoaded: [],
        buttonChanged: !1,
        SOUNDID: {},
        voSoundsToLoad: [],
        sfxSoundsToLoad: [{
                name: "staticSound",
                path: "sounds/static"
            }, {
                name: "openingSound",
                path: "sounds/opening"
            },
            {
                name: "click",
                path: "sounds/click"
            }, {
                name: "spark",
                path: "sounds/spark"
            }, {
                name: "swing",
                path: "sounds/swing"
            }, {
                name: "bomb",
                path: "sounds/bomb"
            }, {
                name: "board",
                path: "sounds/board"
            }
        ],
        debug: !1,
        init: function() {
            ig.ua.mobile ? (this.initSfx(), this.setupJukebox()) : (this.initSfx(), this.setupDesktopMusic());
            this.setupWindowHandler()
        },
        allVoSoundLoaded: function() {
            if (this.voSoundLoaded.length >= this.voSoundsToLoad.length) {
                this.debug && console.log("Vo ready");
                for (index = 0; index <
                    this.voSoundLoaded.length; index++) this.voSoundLoaded[index].on("end", function(b) {
                    b.isPlaying = !1;
                    this.soundBuffer.pop()
                }.bind(this, this.voSoundLoaded[index])), this.voSoundLoaded[index].on("play", function(b) {
                    b.isPlaying = !0
                }.bind(this, this.voSoundLoaded[index]));
                return !0
            }
            return !1
        },
        allSfxSoundLoaded: function() {
            return this.sfxSoundLoaded.length >= this.sfxSoundsToLoad.length ? !0 : !1
        },
        stopBackgroundMusic: function() {
            ig.ua.mobile ? (this.pausePosition = this.jukebox.player.pause(), this.bgmPlaying = !1) : (this.bgmPlaying = !1, ig.music.pause())
        },
        playBackgroundMusic: function() {
            ig.ua.mobile ? (this.pausePosition ? this.jukebox.player.resume(this.pausePosition) : this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start, !0), this.bgmPlaying = !0) : (this.bgmPlaying = !0, ig.music.play())
        },
        playSound: function(b) {
            if ((b = this[b]) && (!this.forceMuted || !this.muted) && !b.isPlaying) this.soundBuffer.push(b), b.play()
        },
        stopAllAndPlaySound: function(b) {
            this.stopAllSounds();
            this.playSound(b)
        },
        stopAllSounds: function() {
            for (index = 0; index <
                this.soundBuffer.length; index++) this.soundBuffer[index].isPlaying = !1, this.soundBuffer.splice(0, 1)[0].stop()
        },
        addSound: function(b, c, d) {
            var f = c + this.formats.ogg;
            c += this.formats.mp3;
            this.SOUNDID[b] = b;
            this[b] = d ? new Howl({
                urls: [f, c],
                onload: d
            }) : new Howl({
                urls: [f, c]
            })
        },
        _muteSounds: function() {
            for (i = 0; i < ig.resources.length; i++) ig.resources[i].multiChannel && ig.resources[i].stop();
            this.debug && console.log("Sounds muted")
        },
        _unMuteSounds: function() {
            ig.Sound.enabled = !0;
            this.debug && console.log("Sounds can play")
        },
        focusBlurMute: function() {
            this.forceMuted || this.mute()
        },
        focusBlurUnmute: function() {
            this.forceMuted || this.buttonChanged || this.unmute()
        },
        setForceMuted: function(b) {
            this.forceMuted = b
        },
        mute: function() {
            this._muteSounds();
            ig.ua.mobile ? this.jukebox && (this.jukebox.player.pause(), this.jukebox.player.setVolume(0.01)) : ig.music.volume = 0;
            this.muted = !0
        },
        unmute: function() {
            this._unMuteSounds();
            ig.ua.mobile ? this.jukebox && (this.jukebox.player.resume(), this.jukebox.player.setVolume(1)) : ig.music.volume = 1;
            this.muted = !1
        },
        setupWindowHandler: function() {
            "true" === getQueryVariable("webview") ? ($(window).focus(function() {
                ig.ua.mobile && ig.game && ig.game.resumeGame();
                ig.soundHandler && ig.soundHandler.focusBlurUnmute()
            }), $(window).blur(function() {
                ig.soundHandler && ig.soundHandler.focusBlurMute()
            })) : (window.onfocus = function() {
                ig.ua.mobile && ig.game && ig.game.resumeGame();
                ig.soundHandler && ig.soundHandler.focusBlurUnmute()
            }, window.onblur = function() {
                ig.soundHandler && ig.soundHandler.focusBlurMute()
            })
        },
        initSfx: function() {
            for (index = 0; index <
                this.sfxSoundsToLoad.length; index++) {
                var b = function(b) {
                    this.sfxSoundLoaded.push(this[b])
                }.bind(this, this.sfxSoundsToLoad[index].name);
                this.addSound(this.sfxSoundsToLoad[index].name, this.sfxSoundsToLoad[index].path, b)
            }
        },
        initVoSfx: function() {
            for (index = 0; index < this.voSoundsToLoad.length; index++) {
                var b = function(b) {
                    this.voSoundLoaded.push(this[b])
                }.bind(this, this.voSoundsToLoad[index].name);
                this.addSound(this.voSoundsToLoad[index].name, this.voSoundsToLoad[index].path, b)
            }
        },
        setupDesktopMusic: function() {
            ig.music.add("sounds/bgm.*", "bgm")
        },
        setupJukebox: function() {
            ig.ua.mobile && (this.jukebox = new ig.Jukebox)
        },
        forceLoopBGM: function() {
            !this.forceMuted && this.jukebox && this.jukebox.player && (this.jukebox.player.getCurrentTime() || this.jukebox.player.resume(), this.jukebox.player.settings.spritemap.music && this.jukebox.player.settings.spritemap.music.loop ? this.jukebox.player.getCurrentTime() >= this.jukebox.player.settings.spritemap.music.end && this.jukebox.player.resume(this.jukebox.player.settings.spritemap.music.start) : this.jukebox.player.isPlaying &&
                this.jukebox.player.isPlaying.loop ? this.jukebox.player.getCurrentTime() >= this.jukebox.player.isPlaying.end && this.jukebox.player.resume(this.jukebox.player.isPlaying.start) : this.jukebox.player.backgroundMusic && this.jukebox.player.backgroundMusic.loop && this.jukebox.player.getCurrentTime() >= this.jukebox.player.backgroundMusic.end && this.jukebox.player.resume(this.jukebox.player.backgroundMusic.start))
        }
    })
});
ig.baked = !0;
ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound", "impact.sound-handler").defines(function() {
    ig.main = function(b, c, d, f, g, l, p) {
        ig.system = new ig.System(b, d, f, g, l || 1);
        ig.input = new ig.Input;
        ig.soundManager = new ig.SoundManager;
        ig.music = new ig.Music;
        ig.ready = !0;
        ig.soundHandler = new ig.SoundHandler;
        (new(p || ig.Loader)(c, ig.resources)).load()
    }
});
ig.baked = !0;
ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
    ig.AnimationSheet = ig.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function(b, c, d) {
            this.width = c;
            this.height = d;
            this.image = new ig.Image(b)
        }
    });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: !1,
            y: !1
        },
        pivot: {
            x: 0,
            y: 0
        },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        init: function(b, c, d, f) {
            this.sheet = b;
            this.pivot = {
                x: b.width / 2,
                y: b.height / 2
            };
            this.timer = new ig.Timer;
            this.frameTime = c;
            this.sequence = d;
            this.stop = !!f;
            this.tile = this.sequence[0]
        },
        rewind: function() {
            this.timer.reset();
            this.loopCount = 0;
            this.tile = this.sequence[0];
            return this
        },
        gotoFrame: function(b) {
            this.timer.set(this.frameTime * -b);
            this.update()
        },
        gotoRandomFrame: function() {
            this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
        },
        update: function() {
            var b = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(b / this.sequence.length);
            this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : b % this.sequence.length;
            this.tile = this.sequence[this.frame]
        },
        draw: function(b, c) {
            var d = Math.max(this.sheet.width, this.sheet.height);
            b > ig.system.width || c > ig.system.height || (0 > b + d || 0 > c + d) || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha), 0 == this.angle ? this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(), ig.system.context.translate(ig.system.getDrawPos(b + this.pivot.x), ig.system.getDrawPos(c + this.pivot.y)), ig.system.context.rotate(this.angle),
                this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y), ig.system.context.restore()), 1 != this.alpha && (ig.system.context.globalAlpha = 1))
        }
    })
});
ig.baked = !0;
ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
    ig.Entity = ig.Class.extend({
        id: 0,
        settings: {},
        size: {
            x: 16,
            y: 16
        },
        offset: {
            x: 0,
            y: 0
        },
        posMP: {
            x: 0,
            y: 0
        },
        posML: {
            x: 0,
            y: 0
        },
        enableReposition: !1,
        pos: {
            x: 0,
            y: 0
        },
        last: {
            x: 0,
            y: 0
        },
        vel: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 100,
            y: 100
        },
        zIndex: 0,
        gravityFactor: 1,
        standing: !1,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: !1,
        slopeStanding: {
            min: (44).toRad(),
            max: (136).toRad()
        },
        init: function(b, c, d) {
            this.id = ++ig.Entity._lastId;
            this.pos.x = b;
            this.pos.y = c;
            ig.merge(this, d)
        },
        addAnim: function(b, c, d, f) {
            if (!this.animSheet) throw "No animSheet to add the animation " + b + " to.";
            c = new ig.Animation(this.animSheet, c, d, f);
            this.anims[b] = c;
            this.currentAnim || (this.currentAnim = c);
            return c
        },
        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x,
                this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var b = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y * ig.system.tick, this.size.x, this.size.y);
            this.handleMovementTrace(b);
            this.currentAnim && this.currentAnim.update()
        },
        getNewVelocity: function(b, c, d, f) {
            return c ? (b + c * ig.system.tick).limit(-f, f) : d ? (c = d * ig.system.tick, 0 < b - c ? b - c : 0 > b + c ? b + c : 0) : b.limit(-f, f)
        },
        handleMovementTrace: function(b) {
            this.standing = !1;
            b.collision.y &&
                (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
            b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
            if (b.collision.slope) {
                var c = b.collision.slope;
                if (0 < this.bounciness) {
                    var d = this.vel.x * c.nx + this.vel.y * c.ny;
                    this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
                    this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
                } else d = (this.vel.x * c.x + this.vel.y *
                    c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
            }
            this.pos = b.pos
        },
        reposition: function() {
            ig.ua.mobile && this.enableReposition && (portraitMode ? (this.pos.x = this.posMP.x, this.pos.y = this.posMP.y) : (this.pos.x = this.posML.x, this.pos.y = this.posML.y))
        },
        draw: function() {
            this.currentAnim && this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
        },
        kill: function() {
            ig.game.removeEntity(this)
        },
        receiveDamage: function(b) {
            this.health -= b;
            0 >= this.health && this.kill()
        },
        touches: function(b) {
            return !(this.pos.x >= b.pos.x + b.size.x || this.pos.x + this.size.x <= b.pos.x || this.pos.y >= b.pos.y + b.size.y || this.pos.y + this.size.y <= b.pos.y)
        },
        distanceTo: function(b) {
            var c = this.pos.x + this.size.x / 2 - (b.pos.x + b.size.x / 2);
            b = this.pos.y + this.size.y / 2 - (b.pos.y + b.size.y / 2);
            return Math.sqrt(c * c + b * b)
        },
        angleTo: function(b) {
            return Math.atan2(b.pos.y + b.size.y / 2 - (this.pos.y + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x /
                2))
        },
        check: function() {},
        collideWith: function() {},
        ready: function() {}
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = {
        NEVER: 0,
        LITE: 1,
        PASSIVE: 2,
        ACTIVE: 4,
        FIXED: 8
    };
    ig.Entity.TYPE = {
        NONE: 0,
        A: 1,
        B: 2,
        BOTH: 3
    };
    ig.Entity.checkPair = function(b, c) {
        b.checkAgainst & c.type && b.check(c);
        c.checkAgainst & b.type && c.check(b);
        b.collides && c.collides && b.collides + c.collides > ig.Entity.COLLIDES.ACTIVE && ig.Entity.solveCollision(b, c)
    };
    ig.Entity.solveCollision = function(b, c) {
        var d = null;
        if (b.collides == ig.Entity.COLLIDES.LITE || c.collides == ig.Entity.COLLIDES.FIXED) d =
            b;
        else if (c.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) d = c;
        b.last.x + b.size.x > c.last.x && b.last.x < c.last.x + c.size.x ? (b.last.y < c.last.y ? ig.Entity.seperateOnYAxis(b, c, d) : ig.Entity.seperateOnYAxis(c, b, d), b.collideWith(c, "y"), c.collideWith(b, "y")) : b.last.y + b.size.y > c.last.y && b.last.y < c.last.y + c.size.y && (b.last.x < c.last.x ? ig.Entity.seperateOnXAxis(b, c, d) : ig.Entity.seperateOnXAxis(c, b, d), b.collideWith(c, "x"), c.collideWith(b, "x"))
    };
    ig.Entity.seperateOnXAxis = function(b, c, d) {
        var f =
            b.pos.x + b.size.x - c.pos.x;
        d ? (d.vel.x = -d.vel.x * d.bounciness + (b === d ? c : b).vel.x, c = ig.game.collisionMap.trace(d.pos.x, d.pos.y, d == b ? -f : f, 0, d.size.x, d.size.y), d.pos.x = c.pos.x) : (d = (b.vel.x - c.vel.x) / 2, b.vel.x = -d, c.vel.x = d, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, -f / 2, 0, b.size.x, b.size.y), b.pos.x = Math.floor(d.pos.x), b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, f / 2, 0, c.size.x, c.size.y), c.pos.x = Math.ceil(b.pos.x))
    };
    ig.Entity.seperateOnYAxis = function(b, c, d) {
        var f = b.pos.y + b.size.y - c.pos.y;
        if (d) {
            c = b === d ? c : b;
            d.vel.y = -d.vel.y * d.bounciness + c.vel.y;
            var g = 0;
            d == b && Math.abs(d.vel.y - c.vel.y) < d.minBounceVelocity && (d.standing = !0, g = c.vel.x * ig.system.tick);
            b = ig.game.collisionMap.trace(d.pos.x, d.pos.y, g, d == b ? -f : f, d.size.x, d.size.y);
            d.pos.y = b.pos.y;
            d.pos.x = b.pos.x
        } else ig.game.gravity && (c.standing || 0 < b.vel.y) ? (d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, 0, -(b.pos.y + b.size.y - c.pos.y), b.size.x, b.size.y), b.pos.y = d.pos.y, 0 < b.bounciness && b.vel.y > b.minBounceVelocity ? b.vel.y *= -b.bounciness : (b.standing = !0, b.vel.y = 0)) : (d =
            (b.vel.y - c.vel.y) / 2, b.vel.y = -d, c.vel.y = d, g = c.vel.x * ig.system.tick, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, g, -f / 2, b.size.x, b.size.y), b.pos.y = d.pos.y, b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, 0, f / 2, c.size.x, c.size.y), c.pos.y = b.pos.y)
    }
});
ig.baked = !0;
ig.module("impact.map").defines(function() {
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function(b, c) {
            this.tilesize = b;
            this.data = c;
            this.height = c.length;
            this.width = c[0].length
        },
        getTile: function(b, c) {
            var d = Math.floor(b / this.tilesize),
                f = Math.floor(c / this.tilesize);
            return 0 <= d && d < this.width && 0 <= f && f < this.height ? this.data[f][d] : 0
        },
        setTile: function(b, c, d) {
            b = Math.floor(b / this.tilesize);
            c = Math.floor(c / this.tilesize);
            0 <= b && b < this.width && 0 <= c && c < this.height && (this.data[c][b] =
                d)
        }
    })
});
ig.baked = !0;
ig.module("impact.collision-map").requires("impact.map").defines(function() {
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function(b, c, g) {
            this.parent(b, c);
            this.tiledef = g || ig.CollisionMap.defaultTileDef;
            for (var l in this.tiledef) l | 0 > this.lastSlope && (this.lastSlope = l | 0)
        },
        trace: function(b, c, g, l, p, x) {
            var s = {
                    collision: {
                        x: !1,
                        y: !1,
                        slope: !1
                    },
                    pos: {
                        x: b,
                        y: c
                    },
                    tile: {
                        x: 0,
                        y: 0
                    }
                },
                y = Math.ceil(Math.max(Math.abs(g), Math.abs(l)) / this.tilesize);
            if (1 < y)
                for (var u = g / y, j = l / y, m = 0; m < y && (u || j) && !(this._traceStep(s,
                        b, c, u, j, p, x, g, l, m), b = s.pos.x, c = s.pos.y, s.collision.x && (g = u = 0), s.collision.y && (l = j = 0), s.collision.slope); m++);
            else this._traceStep(s, b, c, g, l, p, x, g, l, 0);
            return s
        },
        _traceStep: function(b, c, g, l, p, x, s, y, u, j) {
            b.pos.x += l;
            b.pos.y += p;
            var m = 0;
            if (l) {
                var v = 0 < l ? x : 0,
                    D = 0 > l ? this.tilesize : 0,
                    m = Math.max(Math.floor(g / this.tilesize), 0),
                    N = Math.min(Math.ceil((g + s) / this.tilesize), this.height);
                l = Math.floor((b.pos.x + v) / this.tilesize);
                var F = Math.floor((c + v) / this.tilesize);
                if (0 < j || l == F || 0 > F || F >= this.width) F = -1;
                if (0 <= l && l < this.width)
                    for (var E =
                            m; E < N && !(-1 != F && (m = this.data[E][F], 1 < m && m <= this.lastSlope && this._checkTileDef(b, m, c, g, y, u, x, s, F, E))); E++)
                        if (m = this.data[E][l], 1 == m || m > this.lastSlope || 1 < m && this._checkTileDef(b, m, c, g, y, u, x, s, l, E)) {
                            if (1 < m && m <= this.lastSlope && b.collision.slope) break;
                            b.collision.x = !0;
                            b.tile.x = m;
                            c = b.pos.x = l * this.tilesize - v + D;
                            y = 0;
                            break
                        }
            }
            if (p) {
                v = 0 < p ? s : 0;
                p = 0 > p ? this.tilesize : 0;
                m = Math.max(Math.floor(b.pos.x / this.tilesize), 0);
                D = Math.min(Math.ceil((b.pos.x + x) / this.tilesize), this.width);
                E = Math.floor((b.pos.y + v) / this.tilesize);
                N = Math.floor((g + v) / this.tilesize);
                if (0 < j || E == N || 0 > N || N >= this.height) N = -1;
                if (0 <= E && E < this.height)
                    for (l = m; l < D && !(-1 != N && (m = this.data[N][l], 1 < m && m <= this.lastSlope && this._checkTileDef(b, m, c, g, y, u, x, s, l, N))); l++)
                        if (m = this.data[E][l], 1 == m || m > this.lastSlope || 1 < m && this._checkTileDef(b, m, c, g, y, u, x, s, l, E)) {
                            if (1 < m && m <= this.lastSlope && b.collision.slope) break;
                            b.collision.y = !0;
                            b.tile.y = m;
                            b.pos.y = E * this.tilesize - v + p;
                            break
                        }
            }
        },
        _checkTileDef: function(b, c, g, l, p, x, s, y, u, j) {
            var m = this.tiledef[c];
            if (!m) return !1;
            c = (m[2] -
                m[0]) * this.tilesize;
            var v = (m[3] - m[1]) * this.tilesize,
                D = m[4];
            s = g + p + (0 > v ? s : 0) - (u + m[0]) * this.tilesize;
            y = l + x + (0 < c ? y : 0) - (j + m[1]) * this.tilesize;
            if (0 < c * y - v * s) {
                if (0 > p * -v + x * c) return D;
                u = Math.sqrt(c * c + v * v);
                j = v / u;
                u = -c / u;
                var N = s * j + y * u,
                    m = j * N,
                    N = u * N;
                if (m * m + N * N >= p * p + x * x) return D || 0.5 > c * (y - x) - v * (s - p);
                b.pos.x = g + p - m;
                b.pos.y = l + x - N;
                b.collision.slope = {
                    x: c,
                    y: v,
                    nx: j,
                    ny: u
                };
                return !0
            }
            return !1
        }
    });
    var b = 1 / 3,
        c = 2 / 3;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, c, !0],
        6: [0, c, 1, b, !0],
        7: [0, b, 1, 0, !0],
        3: [0, 1, 1, 0.5, !0],
        4: [0, 0.5, 1, 0, !0],
        2: [0,
            1, 1, 0, !0
        ],
        10: [0.5, 1, 1, 0, !0],
        21: [0, 1, 0.5, 0, !0],
        32: [c, 1, 1, 0, !0],
        43: [b, 1, c, 0, !0],
        54: [0, 1, b, 0, !0],
        27: [0, 0, 1, b, !0],
        28: [0, b, 1, c, !0],
        29: [0, c, 1, 1, !0],
        25: [0, 0, 1, 0.5, !0],
        26: [0, 0.5, 1, 1, !0],
        24: [0, 0, 1, 1, !0],
        11: [0, 0, 0.5, 1, !0],
        22: [0.5, 0, 1, 1, !0],
        33: [0, 0, b, 1, !0],
        44: [b, 0, c, 1, !0],
        55: [c, 0, 1, 1, !0],
        16: [1, b, 0, 0, !0],
        17: [1, c, 0, b, !0],
        18: [1, 1, 0, c, !0],
        14: [1, 0.5, 0, 0, !0],
        15: [1, 1, 0, 0.5, !0],
        13: [1, 1, 0, 0, !0],
        8: [0.5, 1, 0, 0, !0],
        19: [1, 1, 0.5, 0, !0],
        30: [b, 1, 0, 0, !0],
        41: [c, 1, b, 0, !0],
        52: [1, 1, c, 0, !0],
        38: [1, c, 0, 1, !0],
        39: [1, b, 0, c, !0],
        40: [1, 0,
            0, b, !0
        ],
        36: [1, 0.5, 0, 1, !0],
        37: [1, 0, 0, 0.5, !0],
        35: [1, 0, 0, 1, !0],
        9: [1, 0, 0.5, 1, !0],
        20: [0.5, 0, 0, 1, !0],
        31: [1, 0, c, 1, !0],
        42: [c, 0, b, 1, !0],
        53: [b, 0, 0, 1, !0],
        12: [0, 0, 1, 0, !1],
        23: [1, 1, 0, 1, !1],
        34: [1, 0, 1, 1, !1],
        45: [0, 1, 0, 0, !1]
    };
    ig.CollisionMap.staticNoCollision = {
        trace: function(b, c, g, l) {
            return {
                collision: {
                    x: !1,
                    y: !1,
                    slope: !1
                },
                pos: {
                    x: b + g,
                    y: c + l
                },
                tile: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
});
ig.baked = !0;
ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: !1,
        tilesetName: "",
        foreground: !1,
        enabled: !0,
        preRender: !1,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: !1,
        anims: {},
        init: function(b, c, d) {
            this.parent(b, c);
            this.setTileset(d)
        },
        setTileset: function(b) {
            this.tilesetName = b instanceof ig.Image ? b.path : b;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null
        },
        setScreenPos: function(b,
            c) {
            this.scroll.x = b / this.distance;
            this.scroll.y = c / this.distance
        },
        preRenderMapToChunks: function() {
            var b = this.width * this.tilesize * ig.system.scale,
                c = this.height * this.tilesize * ig.system.scale,
                d = Math.ceil(b / this.chunkSize),
                f = Math.ceil(c / this.chunkSize);
            this.preRenderedChunks = [];
            for (var g = 0; g < f; g++) {
                this.preRenderedChunks[g] = [];
                for (var l = 0; l < d; l++) this.preRenderedChunks[g][l] = this.preRenderChunk(l, g, l == d - 1 ? b - l * this.chunkSize : this.chunkSize, g == f - 1 ? c - g * this.chunkSize : this.chunkSize)
            }
        },
        preRenderChunk: function(b,
            c, d, f) {
            var g = d / this.tilesize / ig.system.scale + 1,
                l = f / this.tilesize / ig.system.scale + 1,
                p = b * this.chunkSize / ig.system.scale % this.tilesize,
                x = c * this.chunkSize / ig.system.scale % this.tilesize;
            b = Math.floor(b * this.chunkSize / this.tilesize / ig.system.scale);
            c = Math.floor(c * this.chunkSize / this.tilesize / ig.system.scale);
            var s = ig.$new("canvas");
            s.width = d;
            s.height = f;
            d = ig.system.context;
            ig.system.context = s.getContext("2d");
            for (f = 0; f < g; f++)
                for (var y = 0; y < l; y++)
                    if (f + b < this.width && y + c < this.height) {
                        var u = this.data[y + c][f + b];
                        u && this.tiles.drawTile(f * this.tilesize - p, y * this.tilesize - x, u - 1, this.tilesize)
                    }
            ig.system.context = d;
            return s
        },
        draw: function() {
            this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled())
        },
        drawPreRendered: function() {
            this.preRenderedChunks || this.preRenderMapToChunks();
            var b = ig.system.getDrawPos(this.scroll.x),
                c = ig.system.getDrawPos(this.scroll.y);
            this.repeat && (b %= this.width * this.tilesize * ig.system.scale, c %= this.height * this.tilesize * ig.system.scale);
            var d = Math.max(Math.floor(b /
                    this.chunkSize), 0),
                f = Math.max(Math.floor(c / this.chunkSize), 0),
                g = Math.ceil((b + ig.system.realWidth) / this.chunkSize),
                l = Math.ceil((c + ig.system.realHeight) / this.chunkSize),
                p = this.preRenderedChunks[0].length,
                x = this.preRenderedChunks.length;
            this.repeat || (g = Math.min(g, p), l = Math.min(l, x));
            for (var s = 0; f < l; f++) {
                for (var y = 0, u = d; u < g; u++) {
                    var j = this.preRenderedChunks[f % x][u % p],
                        m = -b + u * this.chunkSize - y,
                        v = -c + f * this.chunkSize - s;
                    ig.system.context.drawImage(j, m, v);
                    ig.Image.drawCount++;
                    this.debugChunks && (ig.system.context.strokeStyle =
                        "#f0f", ig.system.context.strokeRect(m, v, this.chunkSize, this.chunkSize));
                    this.repeat && j.width < this.chunkSize && m + j.width < ig.system.realWidth && (y = this.chunkSize - j.width, g++)
                }
                this.repeat && j.height < this.chunkSize && v + j.height < ig.system.realHeight && (s = this.chunkSize - j.height, l++)
            }
        },
        drawTiled: function() {
            for (var b = 0, c = null, d = (this.scroll.x / this.tilesize).toInt(), f = (this.scroll.y / this.tilesize).toInt(), g = this.scroll.x % this.tilesize, l = this.scroll.y % this.tilesize, p = -g - this.tilesize, g = ig.system.width + this.tilesize -
                    g, x = ig.system.height + this.tilesize - l, s = -1, l = -l - this.tilesize; l < x; s++, l += this.tilesize) {
                var y = s + f;
                if (y >= this.height || 0 > y) {
                    if (!this.repeat) continue;
                    y = 0 < y ? y % this.height : (y + 1) % this.height + this.height - 1
                }
                for (var u = -1, j = p; j < g; u++, j += this.tilesize) {
                    b = u + d;
                    if (b >= this.width || 0 > b) {
                        if (!this.repeat) continue;
                        b = 0 < b ? b % this.width : (b + 1) % this.width + this.width - 1
                    }
                    if (b = this.data[y][b])(c = this.anims[b - 1]) ? c.draw(j, l) : this.tiles.drawTile(j, l, b - 1, this.tilesize)
                }
            }
        }
    })
});
ig.baked = !0;
ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
    ig.Game = ig.Class.extend({
        clearColor: "#000000",
        gravity: 0,
        screen: {
            x: 0,
            y: 0
        },
        _rscreen: {
            x: 0,
            y: 0
        },
        entities: [],
        namedEntities: {},
        collisionMap: ig.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        autoSort: !1,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: !1,
        staticInstantiate: function() {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null
        },
        loadLevelWithoutEntities: function(b) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (var c = 0; c < b.layer.length; c++) {
                var d = b.layer[c];
                if ("collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
                else {
                    var f = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
                    f.anims = this.backgroundAnims[d.tilesetName] || {};
                    f.repeat = d.repeat;
                    f.distance = d.distance;
                    f.foreground = !!d.foreground;
                    f.preRender = !!d.preRender;
                    f.name =
                        d.name;
                    this.backgroundMaps.push(f)
                }
            }
        },
        loadLevel: function(b) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var c = 0; c < b.entities.length; c++) {
                var d = b.entities[c];
                this.spawnEntity(d.type, d.x, d.y, d.settings)
            }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (c = 0; c < b.layer.length; c++)
                if (d = b.layer[c], "collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
                else {
                    var f = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
                    f.anims = this.backgroundAnims[d.tilesetName] || {};
                    f.repeat = d.repeat;
                    f.distance = d.distance;
                    f.foreground = !!d.foreground;
                    f.preRender = !!d.preRender;
                    f.name = d.name;
                    this.backgroundMaps.push(f)
                }
            for (c = 0; c < this.entities.length; c++) this.entities[c].ready()
        },
        loadLevelDeferred: function(b) {
            this._levelToLoad = b
        },
        getMapByName: function(b) {
            if ("collision" == b) return this.collisionMap;
            for (var c = 0; c < this.backgroundMaps.length; c++)
                if (this.backgroundMaps[c].name == b) return this.backgroundMaps[c];
            return null
        },
        getEntityByName: function(b) {
            return this.namedEntities[b]
        },
        getEntitiesByType: function(b) {
            b = "string" === typeof b ? ig.global[b] : b;
            for (var c = [], d = 0; d < this.entities.length; d++) {
                var f = this.entities[d];
                f instanceof b && !f._killed && c.push(f)
            }
            return c
        },
        spawnEntity: function(b, c, d, f) {
            var g = "string" === typeof b ? ig.global[b] : b;
            if (!g) throw "Can't spawn entity of type " + b;
            b = new g(c, d, f || {});
            this.entities.push(b);
            b.name && (this.namedEntities[b.name] = b);
            return b
        },
        sortEntities: function() {
            this.entities.sort(this.sortBy)
        },
        sortEntitiesDeferred: function() {
            this._doSortEntities = !0
        },
        removeEntity: function(b) {
            b.name && delete this.namedEntities[b.name];
            b._killed = !0;
            b.type = ig.Entity.TYPE.NONE;
            b.checkAgainst = ig.Entity.TYPE.NONE;
            b.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(b)
        },
        run: function() {
            this.update();
            this.draw()
        },
        update: function() {
            this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null);
            this.updateEntities();
            this.checkEntities();
            for (var b = 0; b < this._deferredKill.length; b++) this.entities.erase(this._deferredKill[b]);
            this._deferredKill = [];
            if (this._doSortEntities ||
                this.autoSort) this.sortEntities(), this._doSortEntities = !1;
            for (var c in this.backgroundAnims) {
                var b = this.backgroundAnims[c],
                    d;
                for (d in b) b[d].update()
            }
        },
        updateEntities: function() {
            for (var b = 0; b < this.entities.length; b++) {
                var c = this.entities[b];
                c._killed || c.update()
            }
        },
        draw: function() {
            this.clearColor && ig.system.clear(this.clearColor);
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            var b;
            for (b = 0; b < this.backgroundMaps.length; b++) {
                var c =
                    this.backgroundMaps[b];
                if (c.foreground) break;
                c.setScreenPos(this.screen.x, this.screen.y);
                c.draw()
            }
            this.drawEntities();
            for (b; b < this.backgroundMaps.length; b++) c = this.backgroundMaps[b], c.setScreenPos(this.screen.x, this.screen.y), c.draw()
        },
        drawEntities: function() {
            for (var b = 0; b < this.entities.length; b++) this.entities[b].draw()
        },
        checkEntities: function() {
            for (var b = {}, c = 0; c < this.entities.length; c++) {
                var d = this.entities[c];
                if (!(d.type == ig.Entity.TYPE.NONE && d.checkAgainst == ig.Entity.TYPE.NONE && d.collides == ig.Entity.COLLIDES.NEVER))
                    for (var f = {}, g = Math.floor(d.pos.y / this.cellSize), l = Math.floor((d.pos.x + d.size.x) / this.cellSize) + 1, p = Math.floor((d.pos.y + d.size.y) / this.cellSize) + 1, x = Math.floor(d.pos.x / this.cellSize); x < l; x++)
                        for (var s = g; s < p; s++)
                            if (b[x])
                                if (b[x][s]) {
                                    for (var y = b[x][s], u = 0; u < y.length; u++) d.touches(y[u]) && !f[y[u].id] && (f[y[u].id] = !0, ig.Entity.checkPair(d, y[u]));
                                    y.push(d)
                                } else b[x][s] = [d];
                else b[x] = {}, b[x][s] = [d]
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function(b, c) {
            return b.zIndex - c.zIndex
        },
        POS_X: function(b, c) {
            return b.pos.x + b.size.x - (c.pos.x +
                c.size.x)
        },
        POS_Y: function(b, c) {
            return b.pos.y + b.size.y - (c.pos.y + c.size.y)
        }
    }
});
ig.baked = !0;
ig.module("impact.debug.menu").requires("dom.ready", "impact.system").defines(function() {
    ig.System.inject({
        run: function() {
            ig.debug.beforeRun();
            this.parent();
            ig.debug.afterRun()
        },
        setGameNow: function(b) {
            this.parent(b);
            ig.debug.ready()
        }
    });
    ig.Debug = ig.Class.extend({
        options: {},
        panels: {},
        numbers: {},
        container: null,
        panelMenu: null,
        activePanel: null,
        debugTime: 0,
        debugTickAvg: 0.016,
        debugRealTime: Date.now(),
        init: function() {
            this.container = ig.$new("div");
            this.container.className = "ig_debug";
            ig.$("body")[0].appendChild(this.container);
            this.panelMenu = ig.$new("div");
            this.panelMenu.innerHTML = '<div class="ig_debug_head">Impact.Debug:</div>';
            this.panelMenu.className = "ig_debug_panel_menu";
            this.container.appendChild(this.panelMenu);
            this.numberContainer = ig.$new("div");
            this.numberContainer.className = "ig_debug_stats";
            this.panelMenu.appendChild(this.numberContainer);
            window.console && window.console.log && window.console.assert && (ig.log = console.log.bind ? console.log.bind(console) : console.log, ig.assert = console.assert.bind ? console.assert.bind(console) :
                console.assert);
            ig.show = this.showNumber.bind(this)
        },
        addNumber: function(b) {
            var c = ig.$new("span");
            this.numberContainer.appendChild(c);
            this.numberContainer.appendChild(document.createTextNode(b));
            this.numbers[b] = c
        },
        showNumber: function(b, c, d) {
            this.numbers[b] || this.addNumber(b, d);
            this.numbers[b].textContent = c
        },
        addPanel: function(b) {
            var c = new b.type(b.name, b.label);
            if (b.options)
                for (var d = 0; d < b.options.length; d++) {
                    var f = b.options[d];
                    c.addOption(new ig.DebugOption(f.name, f.object, f.property))
                }
            this.panels[c.name] =
                c;
            c.container.style.display = "none";
            this.container.appendChild(c.container);
            b = ig.$new("div");
            b.className = "ig_debug_menu_item";
            b.textContent = c.label;
            b.addEventListener("click", function() {
                this.togglePanel(c)
            }.bind(this), !1);
            c.menuItem = b;
            f = !1;
            for (d = 1; d < this.panelMenu.childNodes.length; d++) {
                var g = this.panelMenu.childNodes[d];
                if (g.textContent > c.label) {
                    this.panelMenu.insertBefore(b, g);
                    f = !0;
                    break
                }
            }
            f || this.panelMenu.appendChild(b)
        },
        showPanel: function(b) {
            this.togglePanel(this.panels[b])
        },
        togglePanel: function(b) {
            b !=
                this.activePanel && this.activePanel && (this.activePanel.toggle(!1), this.activePanel.menuItem.className = "ig_debug_menu_item", this.activePanel = null);
            var c = "block" != b.container.style.display;
            b.toggle(c);
            b.menuItem.className = "ig_debug_menu_item" + (c ? " active" : "");
            c && (this.activePanel = b)
        },
        ready: function() {
            for (var b in this.panels) this.panels[b].ready()
        },
        beforeRun: function() {
            var b = Date.now();
            this.debugTickAvg = 0.8 * this.debugTickAvg + 0.2 * (b - this.debugRealTime);
            this.debugRealTime = b;
            this.activePanel && this.activePanel.beforeRun()
        },
        afterRun: function() {
            var b = Date.now() - this.debugRealTime;
            this.debugTime = 0.8 * this.debugTime + 0.2 * b;
            this.activePanel && this.activePanel.afterRun();
            this.showNumber("ms", this.debugTime.toFixed(2));
            this.showNumber("fps", Math.round(1E3 / this.debugTickAvg));
            this.showNumber("draws", ig.Image.drawCount);
            ig.game && ig.game.entities && this.showNumber("entities", ig.game.entities.length);
            ig.Image.drawCount = 0
        }
    });
    ig.DebugPanel = ig.Class.extend({
        active: !1,
        container: null,
        options: [],
        panels: [],
        label: "",
        name: "",
        init: function(b,
            c) {
            this.name = b;
            this.label = c;
            this.container = ig.$new("div");
            this.container.className = "ig_debug_panel " + this.name
        },
        toggle: function(b) {
            this.active = b;
            this.container.style.display = b ? "block" : "none"
        },
        addPanel: function(b) {
            this.panels.push(b);
            this.container.appendChild(b.container)
        },
        addOption: function(b) {
            this.options.push(b);
            this.container.appendChild(b.container)
        },
        ready: function() {},
        beforeRun: function() {},
        afterRun: function() {}
    });
    ig.DebugOption = ig.Class.extend({
        name: "",
        labelName: "",
        className: "ig_debug_option",
        label: null,
        mark: null,
        container: null,
        active: !1,
        colors: {
            enabled: "#fff",
            disabled: "#444"
        },
        init: function(b, c, d) {
            this.name = b;
            this.object = c;
            this.property = d;
            this.active = this.object[this.property];
            this.container = ig.$new("div");
            this.container.className = "ig_debug_option";
            this.label = ig.$new("span");
            this.label.className = "ig_debug_label";
            this.label.textContent = this.name;
            this.mark = ig.$new("span");
            this.mark.className = "ig_debug_label_mark";
            this.container.appendChild(this.mark);
            this.container.appendChild(this.label);
            this.container.addEventListener("click", this.click.bind(this), !1);
            this.setLabel()
        },
        setLabel: function() {
            this.mark.style.backgroundColor = this.active ? this.colors.enabled : this.colors.disabled
        },
        click: function(b) {
            this.active = !this.active;
            this.object[this.property] = this.active;
            this.setLabel();
            b.stopPropagation();
            b.preventDefault();
            return !1
        }
    });
    ig.debug = new ig.Debug
});
ig.baked = !0;
ig.module("impact.debug.entities-panel").requires("impact.debug.menu", "impact.entity").defines(function() {
    ig.Entity.inject({
        colors: {
            names: "#fff",
            velocities: "#0f0",
            boxes: "#f00"
        },
        draw: function() {
            this.parent();
            ig.Entity._debugShowBoxes && (ig.system.context.strokeStyle = this.colors.boxes, ig.system.context.lineWidth = 1, ig.system.context.strokeRect(ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x) - 0.5, ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y) - 0.5, this.size.x * ig.system.scale, this.size.y *
                ig.system.scale));
            if (ig.Entity._debugShowVelocities) {
                var b = this.pos.x + this.size.x / 2,
                    c = this.pos.y + this.size.y / 2;
                this._debugDrawLine(this.colors.velocities, b, c, b + this.vel.x, c + this.vel.y)
            }
            if (ig.Entity._debugShowNames && (this.name && (ig.system.context.fillStyle = this.colors.names, ig.system.context.fillText(this.name, ig.system.getDrawPos(this.pos.x - ig.game.screen.x), ig.system.getDrawPos(this.pos.y - ig.game.screen.y))), "object" == typeof this.target))
                for (var d in this.target)(b = ig.game.getEntityByName(this.target[d])) &&
                    this._debugDrawLine(this.colors.names, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, b.pos.x + b.size.x / 2, b.pos.y + b.size.y / 2)
        },
        _debugDrawLine: function(b, c, d, f, g) {
            ig.system.context.strokeStyle = b;
            ig.system.context.lineWidth = 1;
            ig.system.context.beginPath();
            ig.system.context.moveTo(ig.system.getDrawPos(c - ig.game.screen.x), ig.system.getDrawPos(d - ig.game.screen.y));
            ig.system.context.lineTo(ig.system.getDrawPos(f - ig.game.screen.x), ig.system.getDrawPos(g - ig.game.screen.y));
            ig.system.context.stroke();
            ig.system.context.closePath()
        }
    });
    ig.Entity._debugEnableChecks = !0;
    ig.Entity._debugShowBoxes = !1;
    ig.Entity._debugShowVelocities = !1;
    ig.Entity._debugShowNames = !1;
    ig.Entity.oldCheckPair = ig.Entity.checkPair;
    ig.Entity.checkPair = function(b, c) {
        ig.Entity._debugEnableChecks && ig.Entity.oldCheckPair(b, c)
    };
    ig.debug.addPanel({
        type: ig.DebugPanel,
        name: "entities",
        label: "Entities",
        options: [{
            name: "Checks & Collisions",
            object: ig.Entity,
            property: "_debugEnableChecks"
        }, {
            name: "Show Collision Boxes",
            object: ig.Entity,
            property: "_debugShowBoxes"
        }, {
            name: "Show Velocities",
            object: ig.Entity,
            property: "_debugShowVelocities"
        }, {
            name: "Show Names & Targets",
            object: ig.Entity,
            property: "_debugShowNames"
        }]
    })
});
ig.baked = !0;
ig.module("impact.debug.maps-panel").requires("impact.debug.menu", "impact.game", "impact.background-map").defines(function() {
    ig.Game.inject({
        loadLevel: function(b) {
            this.parent(b);
            ig.debug.panels.maps.load(this)
        }
    });
    ig.DebugMapsPanel = ig.DebugPanel.extend({
        maps: [],
        mapScreens: [],
        init: function(b, c) {
            this.parent(b, c);
            this.load()
        },
        load: function(b) {
            this.options = [];
            this.panels = [];
            if (!b || !b.backgroundMaps.length) this.container.innerHTML = "<em>No Maps Loaded</em>";
            else {
                this.maps = b.backgroundMaps;
                this.mapScreens = [];
                this.container.innerHTML = "";
                for (b = 0; b < this.maps.length; b++) {
                    var c = this.maps[b],
                        d = new ig.DebugPanel(b, "Layer " + b),
                        f = new ig.$new("strong");
                    f.textContent = b + ": " + c.tiles.path;
                    d.container.appendChild(f);
                    d.addOption(new ig.DebugOption("Enabled", c, "enabled"));
                    d.addOption(new ig.DebugOption("Pre Rendered", c, "preRender"));
                    d.addOption(new ig.DebugOption("Show Chunks", c, "debugChunks"));
                    this.generateMiniMap(d, c, b);
                    this.addPanel(d)
                }
            }
        },
        generateMiniMap: function(b, c, d) {
            var f = ig.system.scale,
                g = ig.$new("canvas"),
                l = g.getContext("2d"),
                p = c.tiles.width * f,
                x = c.tiles.height * f,
                s = p / c.tilesize;
            l.drawImage(c.tiles.data, 0, 0, p, x, 0, 0, s, x / c.tilesize);
            l = ig.$new("canvas");
            l.width = c.width * f;
            l.height = c.height * f;
            var y = l.getContext("2d");
            ig.game.clearColor && (y.fillStyle = ig.game.clearColor, y.fillRect(0, 0, p, x));
            for (x = p = 0; x < c.width; x++)
                for (var u = 0; u < c.height; u++)(p = c.data[u][x]) && y.drawImage(g, Math.floor((p - 1) * f % s), Math.floor((p - 1) * f / s) * f, f, f, x * f, u * f, f, f);
            g = ig.$new("div");
            g.className = "ig_debug_map_container";
            g.style.width = c.width *
                f + "px";
            g.style.height = c.height * f + "px";
            s = ig.$new("div");
            s.className = "ig_debug_map_screen";
            s.style.width = ig.system.width / c.tilesize * f - 2 + "px";
            s.style.height = ig.system.height / c.tilesize * f - 2 + "px";
            this.mapScreens[d] = s;
            g.appendChild(l);
            g.appendChild(s);
            b.container.appendChild(g)
        },
        afterRun: function() {
            for (var b = ig.system.scale, c = 0; c < this.maps.length; c++) {
                var d = this.maps[c],
                    f = this.mapScreens[c];
                if (d && f) {
                    var g = d.scroll.x / d.tilesize,
                        l = d.scroll.y / d.tilesize;
                    d.repeat && (g %= d.width, l %= d.height);
                    f.style.left = g * b +
                        "px";
                    f.style.top = l * b + "px"
                }
            }
        }
    });
    ig.debug.addPanel({
        type: ig.DebugMapsPanel,
        name: "maps",
        label: "Background Maps"
    })
});
ig.baked = !0;
ig.module("impact.debug.graph-panel").requires("impact.debug.menu", "impact.system", "impact.game", "impact.image").defines(function() {
    ig.Game.inject({
        draw: function() {
            ig.graph.beginClock("draw");
            this.parent();
            ig.graph.endClock("draw")
        },
        update: function() {
            ig.graph.beginClock("update");
            this.parent();
            ig.graph.endClock("update")
        },
        checkEntities: function() {
            ig.graph.beginClock("checks");
            this.parent();
            ig.graph.endClock("checks")
        }
    });
    ig.DebugGraphPanel = ig.DebugPanel.extend({
        clocks: {},
        marks: [],
        textY: 0,
        height: 128,
        ms: 64,
        timeBeforeRun: 0,
        init: function(b, c) {
            this.parent(b, c);
            this.mark16ms = (this.height - 16 * (this.height / this.ms)).round();
            this.mark33ms = (this.height - 33 * (this.height / this.ms)).round();
            this.msHeight = this.height / this.ms;
            this.graph = ig.$new("canvas");
            this.graph.width = window.innerWidth;
            this.graph.height = this.height;
            this.container.appendChild(this.graph);
            this.ctx = this.graph.getContext("2d");
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(0, this.mark16ms, this.graph.width, 1);
            this.ctx.fillRect(0, this.mark33ms, this.graph.width,
                1);
            this.addGraphMark("16ms", this.mark16ms);
            this.addGraphMark("33ms", this.mark33ms);
            this.addClock("draw", "Draw", "#13baff");
            this.addClock("update", "Entity Update", "#bb0fff");
            this.addClock("checks", "Entity Checks & Collisions", "#a2e908");
            this.addClock("lag", "System Lag", "#f26900");
            ig.mark = this.mark.bind(this);
            ig.graph = this
        },
        addGraphMark: function(b, c) {
            var d = ig.$new("span");
            d.className = "ig_debug_graph_mark";
            d.textContent = b;
            d.style.top = c.round() + "px";
            this.container.appendChild(d)
        },
        addClock: function(b, c,
            d) {
            var f = ig.$new("span");
            f.className = "ig_debug_legend_color";
            f.style.backgroundColor = d;
            var g = ig.$new("span");
            g.className = "ig_debug_legend_number";
            g.appendChild(document.createTextNode("0"));
            var l = ig.$new("span");
            l.className = "ig_debug_legend";
            l.appendChild(f);
            l.appendChild(document.createTextNode(c + " ("));
            l.appendChild(g);
            l.appendChild(document.createTextNode("ms)"));
            this.container.appendChild(l);
            this.clocks[b] = {
                description: c,
                color: d,
                current: 0,
                start: Date.now(),
                avg: 0,
                html: g
            }
        },
        beginClock: function(b,
            c) {
            this.clocks[b].start = Date.now() + (c || 0)
        },
        endClock: function(b) {
            b = this.clocks[b];
            b.current = Math.round(Date.now() - b.start);
            b.avg = 0.8 * b.avg + 0.2 * b.current
        },
        mark: function(b, c) {
            this.active && this.marks.push({
                msg: b,
                color: c || "#fff"
            })
        },
        beforeRun: function() {
            this.endClock("lag");
            this.timeBeforeRun = Date.now()
        },
        afterRun: function() {
            var b = Date.now() - this.timeBeforeRun;
            this.beginClock("lag", Math.max(1E3 / ig.system.fps - b, 0));
            var b = this.graph.width - 1,
                c = this.height;
            this.ctx.drawImage(this.graph, -1, 0);
            this.ctx.fillStyle =
                "#000";
            this.ctx.fillRect(b, 0, 1, this.height);
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(b, this.mark16ms, 1, 1);
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(b, this.mark33ms, 1, 1);
            for (var d in this.clocks) {
                var f = this.clocks[d];
                f.html.textContent = f.avg.toFixed(2);
                if (f.color && 0 < f.current) {
                    this.ctx.fillStyle = f.color;
                    var g = f.current * this.msHeight,
                        c = c - g;
                    this.ctx.fillRect(b, c, 1, g);
                    f.current = 0
                }
            }
            this.ctx.textAlign = "right";
            this.ctx.textBaseline = "top";
            this.ctx.globalAlpha = 0.5;
            for (d = 0; d < this.marks.length; d++) c = this.marks[d],
                this.ctx.fillStyle = c.color, this.ctx.fillRect(b, 0, 1, this.height), c.msg && (this.ctx.fillText(c.msg, b - 1, this.textY), this.textY = (this.textY + 8) % 32);
            this.ctx.globalAlpha = 1;
            this.marks = []
        }
    });
    ig.debug.addPanel({
        type: ig.DebugGraphPanel,
        name: "graph",
        label: "Performance"
    })
});
ig.baked = !0;
ig.module("impact.debug.debug").requires("impact.debug.entities-panel", "impact.debug.maps-panel", "impact.debug.graph-panel").defines(function() {});

ig.baked = !0;
ig.module("plugins.splash-loader").requires("impact.loader", "impact.animation").defines(function() {
    ig.SplashLoader = ig.Loader.extend({
        splashDesktop: new ig.Image("images/background-cover.png"),
        splashMobile: new ig.Image("images/background-cover.png"),
        loadingBar: new ig.Image("images/bar.png"),
        ball: new ig.Image("images/elem-purple-stripes.png"),
        mobilePosition: {
            x: 80,
            y: 360
        },
        desktopPosition: {
            x: 80,
            y: 360
        },
        init: function(b,
            c) {
            this.parent(b, c);
        },
        end: function() {
            this.parent();
			ig.system.setGame(MyGame);
        },
        setupCustomAnimation: function() {
            this.customAnim = new ig.Animation(this.customAnim, 0.05, [0, 1, 2, 3, 4, 5]);
            this.customAnim.currentFrame = 0;
            ig.loadingScreen = this;
            ig.loadingScreen.animationTimer = window.setInterval("ig.loadingScreen.animate()", 100)
        },
        animate: function() {
            this.customAnim.currentFrame <
                this.customAnim.sequence.length ? this.customAnim.currentFrame++ : this.customAnim.currentFrame = 0;
            this.customAnim.gotoFrame(this.customAnim.currentFrame)
        },
        draw: function() {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var b = ig.system.context;
            b.font = "24px amcapEternal";
            b.fillText("fontPreload", 0, 0);
            b.clearRect(0, 0, ig.system.width, ig.system.height);
            if (ig.ua.mobile) {
                if (b.drawImage(this.splashDesktop.data, 0, 0, 480, 640, 0, 0, 480, 640), b.drawImage(this.loadingBar.data, 0, 0, 317, 37, this.desktopPosition.x, this.desktopPosition.y,
                        317, 37), 0 != this.loadingBar.width) {
                    var c = this.loadingBar.width * this._drawStatus;
                    0 > c && (c = 0.1);
                    c > this.loadingBar.width && (c = this.loadingBar.width);
                    b.drawImage(this.loadingBar.data, 0, 37, c, 37, this.desktopPosition.x, this.desktopPosition.y, c, 37)
                }
            } else b.drawImage(this.splashDesktop.data, 0, 0, 480, 640, 0, 0, 480, 640), b.drawImage(this.loadingBar.data, 0, 0, 317, 37, this.desktopPosition.x, this.desktopPosition.y, 317, 37), 0 != this.loadingBar.width && (c = this.loadingBar.width * this._drawStatus, 0 > c && (c = 0.1), c > this.loadingBar.width &&
                (c = this.loadingBar.width), b.drawImage(this.loadingBar.data, 0, 37, c, 37, this.desktopPosition.x, this.desktopPosition.y, c, 37));
            ig.system.context.save();
            ig.system.context.translate(ig.system.getDrawPos(80 + 270 * this._drawStatus + 0.5 * this.ball.width), ig.system.getDrawPos(345 + 0.5 * this.ball.height));
            ig.system.context.rotate(2 * this._drawStatus * Math.PI);
            ig.system.context.drawImage(this.ball.data, -0.5 * this.ball.width, -0.5 * this.ball.height);
            ig.system.context.restore()
        }
    })
});
ig.baked = !0;
ig.module("plugins.tween").requires("impact.entity").defines(function() {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
        for (var c = 0; c < this.length; ++c)
            if (this[c] === b) return c;
        return -1
    });
    ig.Entity.prototype.tweens = [];
    ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update;
    ig.Entity.prototype.update = function() {
        this._preTweenUpdate();
        if (0 < this.tweens.length) {
            for (var b = [], c = 0; c < this.tweens.length; c++) this.tweens[c].update(), this.tweens[c].complete || b.push(this.tweens[c]);
            this.tweens =
                b
        }
    };
    ig.Entity.prototype.tween = function(b, c, d) {
        b = new ig.Tween(this, b, c, d);
        this.tweens.push(b);
        return b
    };
    ig.Entity.prototype.pauseTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].pause()
    };
    ig.Entity.prototype.resumeTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].resume()
    };
    ig.Entity.prototype.stopTweens = function(b) {
        for (var c = 0; c < this.tweens.length; c++) this.tweens[c].stop(b)
    };
    ig.Tween = function(b, c, d, f) {
        var g = {},
            l = {},
            p = {},
            x = 0,
            s = !1,
            y = !1,
            u = !1;
        this.duration = d;
        this.paused =
            this.complete = !1;
        this.easing = ig.Tween.Easing.Linear.EaseNone;
        this.onComplete = !1;
        this.loop = this.delay = 0;
        this.loopCount = -1;
        ig.merge(this, f);
        this.loopNum = this.loopCount;
        this.chain = function(b) {
            u = b
        };
        this.initEnd = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.initEnd(subprop, c[b], d[b])
        };
        this.initStart = function(b, c, d, f) {
            if ("object" !== typeof d[b]) "undefined" !== typeof c[b] && (f[b] = d[b]);
            else
                for (subprop in d[b]) f[b] || (f[b] = {}), "undefined" !== typeof c[b] && this.initStart(subprop,
                    c[b], d[b], f[b])
        };
        this.start = function() {
            this.paused = this.complete = !1;
            this.loopNum = this.loopCount;
            x = 0; - 1 == b.tweens.indexOf(this) && b.tweens.push(this);
            y = !0;
            s = new ig.Timer;
            for (var d in c) this.initEnd(d, c, l);
            for (d in l) this.initStart(d, l, b, g), this.initDelta(d, p, b, l)
        };
        this.initDelta = function(b, c, d, f) {
            if ("object" !== typeof f[b]) c[b] = f[b] - d[b];
            else
                for (subprop in f[b]) c[b] || (c[b] = {}), this.initDelta(subprop, c[b], d[b], f[b])
        };
        this.propUpdate = function(b, c, d, f, g) {
            if ("object" !== typeof d[b]) c[b] = "undefined" != typeof d[b] ?
                d[b] + f[b] * g : c[b];
            else
                for (subprop in d[b]) this.propUpdate(subprop, c[b], d[b], f[b], g)
        };
        this.propSet = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.propSet(subprop, c[b], d[b])
        };
        this.update = function() {
            if (!y) return !1;
            if (this.delay) {
                if (s.delta() < this.delay) return;
                this.delay = 0;
                s.reset()
            }
            if (this.paused || this.complete) return !1;
            var c = (s.delta() + x) / this.duration,
                c = 1 < c ? 1 : c,
                d = this.easing(c);
            for (property in p) this.propUpdate(property, b, g, p, d);
            if (1 <= c) {
                if (0 == this.loopNum ||
                    !this.loop) {
                    this.complete = !0;
                    if (this.onComplete) this.onComplete();
                    u && u.start();
                    return !1
                }
                if (this.loop == ig.Tween.Loop.Revert) {
                    for (property in g) this.propSet(property, g, b);
                    x = 0;
                    s.reset(); - 1 != this.loopNum && this.loopNum--
                } else if (this.loop == ig.Tween.Loop.Reverse) {
                    c = {};
                    d = {};
                    ig.merge(c, l);
                    ig.merge(d, g);
                    ig.merge(g, c);
                    ig.merge(l, d);
                    for (property in l) this.initDelta(property, p, b, l);
                    x = 0;
                    s.reset(); - 1 != this.loopNum && this.loopNum--
                }
            }
        };
        this.pause = function() {
            this.paused = !0;
            x += s.delta()
        };
        this.resume = function() {
            this.paused = !1;
            s.reset()
        };
        this.stop = function(b) {
            b && (this.loop = this.complete = this.paused = !1, x += d, this.update());
            this.complete = !0
        }
    };
    ig.Tween.Loop = {
        Revert: 1,
        Reverse: 2
    };
    ig.Tween.Easing = {
        Linear: {},
        Quadratic: {},
        Cubic: {},
        Quartic: {},
        Quintic: {},
        Sinusoidal: {},
        Exponential: {},
        Circular: {},
        Elastic: {},
        Back: {},
        Bounce: {}
    };
    ig.Tween.Easing.Linear.EaseNone = function(b) {
        return b
    };
    ig.Tween.Easing.Quadratic.EaseIn = function(b) {
        return b * b
    };
    ig.Tween.Easing.Quadratic.EaseOut = function(b) {
        return -b * (b - 2)
    };
    ig.Tween.Easing.Quadratic.EaseInOut =
        function(b) {
            return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1)
        };
    ig.Tween.Easing.Cubic.EaseIn = function(b) {
        return b * b * b
    };
    ig.Tween.Easing.Cubic.EaseOut = function(b) {
        return --b * b * b + 1
    };
    ig.Tween.Easing.Cubic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2)
    };
    ig.Tween.Easing.Quartic.EaseIn = function(b) {
        return b * b * b * b
    };
    ig.Tween.Easing.Quartic.EaseOut = function(b) {
        return -(--b * b * b * b - 1)
    };
    ig.Tween.Easing.Quartic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2)
    };
    ig.Tween.Easing.Quintic.EaseIn =
        function(b) {
            return b * b * b * b * b
        };
    ig.Tween.Easing.Quintic.EaseOut = function(b) {
        return (b -= 1) * b * b * b * b + 1
    };
    ig.Tween.Easing.Quintic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseIn = function(b) {
        return -Math.cos(b * Math.PI / 2) + 1
    };
    ig.Tween.Easing.Sinusoidal.EaseOut = function(b) {
        return Math.sin(b * Math.PI / 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseInOut = function(b) {
        return -0.5 * (Math.cos(Math.PI * b) - 1)
    };
    ig.Tween.Easing.Exponential.EaseIn = function(b) {
        return 0 == b ? 0 : Math.pow(2,
            10 * (b - 1))
    };
    ig.Tween.Easing.Exponential.EaseOut = function(b) {
        return 1 == b ? 1 : -Math.pow(2, -10 * b) + 1
    };
    ig.Tween.Easing.Exponential.EaseInOut = function(b) {
        return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2)
    };
    ig.Tween.Easing.Circular.EaseIn = function(b) {
        return -(Math.sqrt(1 - b * b) - 1)
    };
    ig.Tween.Easing.Circular.EaseOut = function(b) {
        return Math.sqrt(1 - --b * b)
    };
    ig.Tween.Easing.Circular.EaseInOut = function(b) {
        return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
    };
    ig.Tween.Easing.Elastic.EaseIn =
        function(b) {
            var c, d = 0.1,
                f = 0.4;
            if (0 == b) return 0;
            if (1 == b) return 1;
            f || (f = 0.3);
            !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
            return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f))
        };
    ig.Tween.Easing.Elastic.EaseOut = function(b) {
        var c, d = 0.1,
            f = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        f || (f = 0.3);
        !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
        return d * Math.pow(2, -10 * b) * Math.sin(2 * (b - c) * Math.PI / f) + 1
    };
    ig.Tween.Easing.Elastic.EaseInOut = function(b) {
        var c, d = 0.1,
            f = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        f || (f = 0.3);
        !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
        return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f) + 1
    };
    ig.Tween.Easing.Back.EaseIn = function(b) {
        return b * b * (2.70158 * b - 1.70158)
    };
    ig.Tween.Easing.Back.EaseOut = function(b) {
        return (b -= 1) * b * (2.70158 * b + 1.70158) + 1
    };
    ig.Tween.Easing.Back.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2)
    };
    ig.Tween.Easing.Bounce.EaseIn =
        function(b) {
            return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - b)
        };
    ig.Tween.Easing.Bounce.EaseOut = function(b) {
        return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375
    };
    ig.Tween.Easing.Bounce.EaseInOut = function(b) {
        return 0.5 > b ? 0.5 * ig.Tween.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tween.Easing.Bounce.EaseOut(2 * b - 1) + 0.5
    }
});
ig.baked = !0;
ig.module("plugins.url-parameters").defines(function() {
    ig.UrlParameters = ig.Class.extend({
        init: function() {
            switch (getQueryVariable("iphone")) {
                case "true":
                    ig.ua.iPhone = !0, console.log("iPhone mode")
            }
            var b = getQueryVariable("webview");
            if (b) switch (b) {
                case "true":
                    ig.ua.is_uiwebview = !0, console.log("webview mode")
            }
            if (b = getQueryVariable("debug")) switch (b) {
                case "true":
                    ig.game.showDebugMenu(), console.log("debug mode")
            }
            switch (getQueryVariable("view")) {
                case "stats":
                    ig.game.resetPlayerStats(), ig.game.endGame()
            }
            getQueryVariable("ad")
        }
    })
});
ig.baked = !0;
ig.module("plugins.jukebox").defines(function() {
    ig.Jukebox = ig.Class.extend({
        init: function() {
            this.player = new jukebox.Player({
                resources: ["sounds/bgm.mp3", "sounds/bgm.ogg"],
                autoplay: "music",
                spritemap: {
                    music: {
                        start: 0,
                        end: 60,
                        loop: !0
                    }
                }
            })
        }
    })
});
ig.baked = !0;
ig.module("plugins.director").requires("impact.impact").defines(function() {
    ig.Director = ig.Class.extend({
        init: function(b, c) {
            this.game = b;
            this.levels = [];
            this.currentLevel = 0;
            this.append(c)
        },
        loadLevel: function(b) {
            //for (key in dynamicClickableEntityDivs) ig.game.hideOverlay([key]);
            this.currentLevel = b;
            this.game.loadLevel(this.levels[b]);
            return !0
        },
        loadLevelWithoutEntities: function(b) {
            this.currentLevel = b;
            this.game.loadLevelWithoutEntities(this.levels[b]);
            return !0
        },
        append: function(b) {
            newLevels = [];
            return "object" === typeof b ? (b.constructor === [].constructor ? newLevels = b : newLevels[0] = b, this.levels = this.levels.concat(newLevels), !0) : !1
        },
        nextLevel: function() {
            return this.currentLevel + 1 < this.levels.length ? this.loadLevel(this.currentLevel + 1) : !1
        },
        previousLevel: function() {
            return 0 <= this.currentLevel - 1 ? this.loadLevel(this.currentLevel - 1) : !1
        },
        jumpTo: function(b) {
            var c = null;
            for (i = 0; i < this.levels.length; i++) this.levels[i] == b && (c = i);
            return 0 <= c ? this.loadLevel(c) : !1
        },
        firstLevel: function() {
            return this.loadLevel(0)
        },
        lastLevel: function() {
            return this.loadLevel(this.levels.length -
                1)
        },
        reloadLevel: function() {
            return this.loadLevel(this.currentLevel)
        }
    })
});
ig.baked = !0;
ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
    ig.Storage = ig.Class.extend({
        staticInstantiate: function() {
            return !ig.Storage.instance ? null : ig.Storage.instance
        },
        init: function() {
            ig.Storage.instance = this
        },
        isCapable: function() {
            return "undefined" !== typeof window.localStorage
        },
        isSet: function(b) {
            return null !== this.get(b)
        },
        initUnset: function(b, c) {
            null === this.get(b) && this.set(b, c)
        },
        get: function(b) {
            if (!this.isCapable()) return null;
            try {
                return JSON.parse(localStorage.getItem(b))
            } catch (c) {
                return window.localStorage.getItem(b)
            }
        },
        getInt: function(b) {
            return ~~this.get(b)
        },
        getFloat: function(b) {
            return parseFloat(this.get(b))
        },
        getBool: function(b) {
            return !!this.get(b)
        },
        key: function(b) {
            return this.isCapable() ? window.localStorage.key(b) : null
        },
        set: function(b, c) {
            if (!this.isCapable()) return null;
            try {
                window.localStorage.setItem(b, JSON.stringify(c))
            } catch (d) {
                console.log(d)
            }
        },
        setHighest: function(b, c) {
            c > this.getFloat(b) && this.set(b, c)
        },
        remove: function(b) {
            if (!this.isCapable()) return null;
            window.localStorage.removeItem(b)
        },
        clear: function() {
            if (!this.isCapable()) return null;
            window.localStorage.clear()
        }
    })
});
ig.baked = !0;
ig.module("plugins.scale").requires("impact.entity").defines(function() {
    ig.Entity.inject({
        scale: {
            x: 1,
            y: 1
        },
        _offset: {
            x: 0,
            y: 0
        },
        _scale: {
            x: 1,
            y: 1
        },
        _size: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            this.parent(b, c, d);
            this._offset.x = this.offset.x;
            this._offset.y = this.offset.y;
            this._size.x = this.size.x;
            this._size.y = this.size.y;
            this.setScale(this.scale.x, this.scale.y)
        },
        draw: function() {
            var b = ig.system.context;
            b.save();
            b.translate(ig.system.getDrawPos(this.pos.x.round() - this.offset.x - ig.game.screen.x), ig.system.getDrawPos(this.pos.y.round() -
                this.offset.y - ig.game.screen.y));
            b.scale(this._scale.x, this._scale.y);
            null != this.currentAnim && this.currentAnim.draw(0, 0);
            b.restore()
        },
        setScale: function(b, c) {
            var d = this.size.x,
                f = this.size.y;
            this.scale.x = b || this.scale.x;
            this.scale.y = c || this.scale.y;
            this._scale.x = this.scale.x / ig.system.scale;
            this._scale.y = this.scale.y / ig.system.scale;
            this.offset.x = this._offset.x * this._scale.x;
            this.offset.y = this._offset.y * this._scale.y;
            this.size.x = this._size.x * this._scale.x;
            this.size.y = this._size.y * this._scale.y;
            this.pos.x +=
                (d - this.size.x) / 2;
            this.pos.y += (f - this.size.y) / 2
        }
    })
});

ig.baked = !0;
ig.module("plugins.branding.splash").requires("impact.impact", "impact.entity").defines(function() {
    ig.BrandingSplash = ig.Class.extend({
        init: function() {
            ig.game.spawnEntity(EntityBranding, 0, 0)
        }
    });
    EntityBranding = ig.Entity.extend({
        gravityFactor: 0,
        size: {
            x: 32,
            y: 32
        },
        splash_320x480: new ig.AnimationSheet("images/invisible.png", 320, 200),
        splash_480x640: new ig.AnimationSheet("images/invisible.png", 480, 240),
        init: function(b, c, d) {
            this.parent(b, c, d);
            320 >= ig.system.width ? (this.size.x = 320, this.size.y = 200,
                this.anims.idle = new ig.Animation(this.splash_320x480, 0, [0], !0)) : (this.size.x = 480, this.size.y = 240, this.anims.idle = new ig.Animation(this.splash_480x640, 0, [0], !0));
            this.pos.x = (ig.system.width - this.size.x) / 2;
            this.pos.y = -this.size.y - 200;
            this.endPosY = (ig.system.height - this.size.y) / 2;
            b = this.tween({
                pos: {
                    y: this.endPosY
                }
            }, 0.5, {
                easing: ig.Tween.Easing.Bounce.EaseIn
            });
            c = this.tween({}, 2.5, {
                onComplete: function() {
                    ig.game.director.loadLevel(ig.game.director.currentLevel)
                }
            });
            b.chain(c);
            b.start();
            this.currentAnim = this.anims.idle
        },
        createClickableLayer: function() {
            console.log("Build clickable layer");
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            //"undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "images/invisible.png", d))
        },
        createClickableOutboundLayer: function(b,
            c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var l = window.innerHeight / mobileHeight,
                    p = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * p);
                $("#" + g.id).css("top", this.pos.y * l);
                $("#" + g.id).css("width", this.size.x * p);
                $("#" + g.id).css("height", this.size.y * l)
            } else l = w / 2 - destW / 2, p = h / 2 - destH / 2, console.log(l, p), $("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y *
                multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        draw: function() {
            ig.system.context.fillStyle = "#ffffff";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.fillStyle = "#000";
            ig.system.context.font = "12px Arial";
            320 >= ig.system.width ? ig.system.context.fillText("gradle code", ig.system.width - 150, ig.system.height - 15) : ig.system.context.fillText("gradle code", ig.system.width - 160, ig.system.height - 15);
            this.parent()
        }
    })
});

ig.baked = !0;
ig.module("game.entities.branding-logo-placeholder").requires("impact.entity").defines(function() {
    EntityBrandingLogoPlaceholder = ig.Entity.extend({
        gravityFactor: 0,
        size: {
            x: 32,
            y: 32
        },
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        init: function(b, c, d) {
            this.parent(b, c, d);
            if (d) switch (console.log("settings found ... using that div layer name"), b = d.div_layer_name, console.log("settings.centralize:", d.centralize), d.centralize) {
                case "true":
                    console.log("centralize true");
                    centralize = !0;
                    break;
                case "false":
                    console.log("centralize false");
                    centralize = !1;
                    break;
                default:
                    console.log("default ... centralize false"), centralize = !1
            } else b = "branding-logo", centralize = !1;
            if ("undefined" == typeof wm) {
                if (_SETTINGS.Branding.Logo.Enabled) try {
                    ig.game.spawnEntity(EntityBrandingLogo, this.pos.x, this.pos.y, {
                        div_layer_name: b,
                        centralize: centralize
                    })
                } catch (f) {
                    console.log(f)
                }
                this.kill()
            }
        }
    })
});
this.START_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.branding-logo").requires("impact.entity").defines(function() {
    EntityBrandingLogo = ig.Entity.extend({
        gravityFactor: 0,
        logo: new ig.AnimationSheet("images/invisible.png", 1, 1),
        size: {
            x: 32,
            y: 32
        },
        zIndex: 10001,
        init: function(b, c, d) {
            this.parent(b, c, d);
            "undefined" == typeof wm && (false ? (this.size.x = 1, this.size.y = 1, d && d.centralize && (this.pos.x = ig.system.width /
                2 - this.size.x / 2, console.log("centralize true ... centering branded logo ..."))) : this.kill());
            this.anims.idle = new ig.Animation(this.logo, 0, [0], !0);
            this.currentAnim = this.anims.idle;
            
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k ==
                    b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            //"undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "images/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var l = window.innerHeight / mobileHeight,
                    p = window.innerWidth /
                    mobileWidth;
                $("#" + g.id).css("left", this.pos.x * p);
                $("#" + g.id).css("top", this.pos.y * l);
                $("#" + g.id).css("width", this.size.x * p);
                $("#" + g.id).css("height", this.size.y * l)
            } else l = w / 2 - destW / 2, p = h / 2 - destH / 2, console.log(l, p), $("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" +
                d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
this.END_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.button-more-games").requires("impact.entity").defines(function() {
    EntityButtonMoreGames = ig.Entity.extend({
        gravityFactor: 0,
        logo: new ig.AnimationSheet("images/invisible.png", 64, 66),
        size: {
            x: 64,
            y: 66
        },
        zIndex: 750,
        init: function(b, c, d) {
            this.parent(b, c, d);
            "undefined" == typeof wm && (_SETTINGS.MoreGames.Enabled ? (d ? (console.log("settings found ... using that div layer name"), b = d.div_layer_name) : b = "more-games", console.log("div_layer_name:", b), this.checkClickableLayer(b,
                _SETTINGS.MoreGames.Link, !0)) : this.kill());
            this.anims.idle = new ig.Animation(this.logo, 0, [0], !0);
            this.currentAnim = this.anims.idle
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return console.log("clickable layer already exists ..."), !0;
            console.log("doesnt exist yet ...");
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b,
                c, "images/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var l = window.innerHeight / mobileHeight,
                    p = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * p);
                $("#" + g.id).css("top", this.pos.y * l);
                $("#" + g.id).css("width", this.size.x * p);
                $("#" + g.id).css("height", this.size.y * l)
            } else l = document.getElementById("game").offsetLeft,
                p = document.getElementById("game").offsetTop, $("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width =
                this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
ig.baked = !0;
ig.module("game.entities.opening-shield").requires("impact.entity").defines(function() {
    EntityOpeningShield = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        move: 0,
        mIconAnim: 0,
        shieldAnim: 0,
        titleAnim: 0,
        shieldImage: new ig.Image("images/invisible.png"),
        mIconImage: new ig.Image("images/invisible.png"),
        titleImage: new ig.Image("images/invisible.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            if (!ig.wm)
                ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1, this.kill()
        },
        update: function() {
            this.parent();
            this.updateOriginalShieldOpening()
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawOriginalShieldOpening())
        },
        updateOriginalShieldOpening: function() {
            this.initTimer && 0 < this.initTimer.delta() &&
                (this.initTimer = null, this.sheildTimer = new ig.Timer(0.05));
            this.sheildTimer && 0 < this.sheildTimer.delta() && (3 > this.shieldAnim ? (this.shieldAnim++, this.sheildTimer.reset()) : (this.sheildTimer = null, this.moveTimer = new ig.Timer(0.0010), this.mIconTimer = new ig.Timer(0.05), this.titleTimer = new ig.Timer(0.15)));
            this.moveTimer && 0 < this.moveTimer.delta() && (this.move += 0.3, this.moveTimer.reset());
            this.mIconTimer && 0 < this.mIconTimer.delta() && (12 > this.mIconAnim ? (this.mIconAnim++, this.moveTimer.reset()) : this.mIconTimer =
                null);
            this.titleTimer && 0 < this.titleTimer.delta() && (11 > this.titleAnim ? (this.titleAnim++, this.titleTimer.reset()) : (this.titleTimer = null, this.nextLevelTimer = new ig.Timer(1)));
            this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
        },
        drawOriginalShieldOpening: function() {
            if (this.moveTimer) {
                var b = ig.system.context;
                b.save();
                var c = ig.system.width / 2,
                    d = ig.system.height / 2;
                b.translate(c, d);
                b.rotate(this.move * Math.PI / 180);
                b.beginPath();
                b.moveTo(0, 0);
                for (var f = 0, g = 1; 48 >= g; g += 1) b.lineTo(0 + 800 * Math.cos(2 * g * Math.PI / 48), 0 + 800 * Math.sin(2 * g * Math.PI / 48)), f++, 2 == f && (f = 0, b.lineTo(0, 0));
                b.translate(-c, -d);
                c = b.createRadialGradient(c, d, 100, c, d, 250);
                c.addColorStop(0, "rgba(255,255,255,0.1)");
                c.addColorStop(1, "rgba(0,0,0,0)");
                b.fillStyle = c;
                b.fill();
                b.restore()
            }
            this.shieldImage.drawTile(ig.system.width / 2 - 91, 0 - (768 - ig.system.height) / 2, this.shieldAnim, 182, 768);
            this.moveTimer && (this.mIconImage.drawTile(ig.system.width / 2 - 96, ig.system.height / 2 - 70, this.mIconAnim,
                166, 160), this.titleImage.drawTile(ig.system.width / 2 - 204, ig.system.height / 2 + 100, this.titleAnim, 409, 76));
            ig.system.context.globalAlpha = 1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.opening-gradle").requires("impact.entity").defines(function() {
    EntityOpeninggradle = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        gradleAnim: -1,
        gradleImage: new ig.Image("images/invisible.png"),
        gradleTitleImage: new ig.Image("images/invisible.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            if (!ig.wm)
                ig.game.director.nextLevel();
                ig.system.context.globalAlpha = 1;
				this.kill();
        },
        update: function() {
            this.parent();
            this.updategradleOpening()
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawgradleOpening())
        },
        updategradleOpening: function() {
            this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.gradleTimer = new ig.Timer(0.15));
            this.gradleTimer && 0 < this.gradleTimer.delta() && (7 > this.gradleAnim ? (this.gradleAnim++, this.gradleTimer.reset()) :
                (this.gradleTimer = null, this.nextLevelTimer = new ig.Timer(2)));
            this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
        },
        drawgradleOpening: function() {
            var b = ig.system.context.createLinearGradient(0, 0, 0, ig.system.height);
            b.addColorStop(0, "#ffed94");
            b.addColorStop(1, "#ffcd85");
            ig.system.context.fillStyle = b;
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this.gradleImage.drawTile(ig.system.width / 2 - this.gradleImage.width /
                8, ig.system.height / 2 - this.gradleImage.height / 4, this.gradleAnim, 218, 325);
            this.gradleTitleImage.drawTile(ig.system.width / 2 - this.gradleTitleImage.width / 2, ig.system.height / 2 + this.gradleImage.height / 4 + 10, this.gradleAnim, 380, 37);
            ig.system.context.globalAlpha = 1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer").requires("impact.entity").defines(function() {
    EntityPointer = ig.Entity.extend({
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        isClicking: !1,
        isHovering: !1,
        firstClick: !1,
        isReleased: !1,
        hoveringItem: null,
        objectArray: [],
        ignorePause: !0,
        zIndex: 5E3,
        check: function(b) {
            this.objectArray.push(b)
        },
        clickObject: function(b) {
            this.isClicking && !this.firstClick && "function" == typeof b.clicked && (b.clicked(), this.firstClick = !0);
            this.firstClick && !this.isReleased && "function" == typeof b.clicking &&
                b.clicking();
            this.firstClick && this.isReleased && "function" == typeof b.released && (b.released(), this.firstClick = !1)
        },
        update: function() {
            if (ig.ua.mobile) {
                var b = window.innerHeight / mobileHeight;
                this.pos.x = ig.input.mouse.x / (window.innerWidth / mobileWidth) - this.size.x / 2 + ig.game.screen.x;
                this.pos.y = ig.input.mouse.y / b - this.size.y / 2
            } else this.pos.x = ig.input.mouse.x / multiplier - this.size.x / 2 + ig.game.screen.x, this.pos.y = ig.input.mouse.y / multiplier - this.size.y / 2;
            var b = null,
                c = -1;
            for (a = this.objectArray.length - 1; - 1 < a; a--) this.objectArray[a].zIndex >
                c && (c = this.objectArray[a].zIndex, b = this.objectArray[a]);
            null != b ? ("close" == b.name && console.log(b), null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && this.hoveringItem != b && this.hoveringItem.idle(), this.hoveringItem = b, this.clickObject(b), this.objectArray = []) : null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && (this.hoveringItem.idle(), this.hoveringItem = null);
            this.firstClick = !1;
            this.isClicking = ig.input.pressed("click");
            this.isReleased = ig.input.released("click")
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer-selector").requires("game.entities.pointer").defines(function() {
    EntityPointerSelector = EntityPointer.extend({
        zIndex: 1E3,
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        size: {
            x: 20,
            y: 20
        },
        init: function(b, c, d) {
            this.parent(b, c, d)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.select").requires("impact.entity").defines(function() {
    EntitySelect = ig.Entity.extend({
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        canSelect: !1,
        canSelectTimerDuration: 0.35,
        zIndex: 99999,
        isHovering: !1,
        isSelected: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.canSelectTimer = new ig.Timer(this.canSelectTimerDuration)
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b,
            c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "images/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("width", this.size.x * multiplier);
            $("#" + g.id).css("height", this.size.y * multiplier);
            $("#" + g.id).css("position", "absolute");
            var l = w / 2 - destW / 2,
                p = h /
                2 - destH / 2;
            w == mobileWidth ? ($("#" + g.id).css("left", this.pos.x), $("#" + g.id).css("top", this.pos.y)) : ($("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y * multiplier));
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = $("#" + g.id).width();
            dynamicClickableEntityDivs[b].height =
                $("#" + g.id).height();
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        hovered: function() {
            this.isHovering = !0;
            this.dehoverOthers()
        },
        dehoverOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isHovering = !1)
        },
        deselectOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isSelected = !1)
        },
        update: function() {
            this.parent();
            this.canSelectTimer && 0 <
                this.canSelectTimer.delta() && (this.canSelect = !0, this.canSelectTimer = null)
        }
    })
});
ig.baked = !0;
ig.module("game.levels.opening").requires("impact.image", "game.entities.opening-gradle").defines(function() {
    LevelOpening = {
        entities: [{
            type: "EntityOpeninggradle",
            x: 520,
            y: 212
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.levels.test-desktop").requires("impact.image", "game.entities.branding-logo-placeholder", "game.entities.button-more-games").defines(function() {
    LevelTestDesktop = {
        entities: [{
            type: "EntityBrandingLogoPlaceholder",
            x: 296,
            y: 396,
            settings: {
                div_layer_name: "layer_mainmenu",
                centralize: "true"
            }
        }, {
            type: "EntityButtonMoreGames",
            x: 432,
            y: 284,
            settings: {
                div_layer_name: "layer_moregames_mainmenu"
            }
        }],
        layer: [{
            name: "background",
            width: 40,
            height: 30,
            linkWithCollision: !1,
            visible: 1,
            tilesetName: "images/invisible.png",
            repeat: !1,
            preRender: !0,
            distance: "1",
            tilesize: 16,
            foreground: !1,
            data: gradle_levels
        }]
    };
    LevelTestDesktopResources = [new ig.Image("images/invisible.png")]
});
ig.baked = !0;
ig.module("game.levels.test-mobile").requires("impact.image", "game.entities.branding-logo-placeholder", "game.entities.button-more-games").defines(function() {
    LevelTestMobile = {
        entities: [{
            type: "EntityBrandingLogoPlaceholder",
            x: 216,
            y: 548,
            settings: {
                div_layer_name: "layer_mainmenu",
                centralize: "true"
            }
        }, {
            type: "EntityButtonMoreGames",
            x: 204,
            y: 372,
            settings: {
                div_layer_name: "layer_moregames_mainmenu"
            }
        }],
        layer: [{
            name: "background",
            width: 30,
            height: 40,
            linkWithCollision: !1,
            visible: 1,
            tilesetName: "images/invisible.png",
            repeat: !1,
            preRender: !0,
            distance: "1",
            tilesize: 16,
            foreground: !1,
            data: gradle_levels
        }]
    };
    LevelTestMobileResources = [new ig.Image("images/invisible.png")]
});
ig.baked = !0;
ig.module("game.entities.commons.common-storage").requires("impact.entity").defines(function() {
    EntityCommonStorage = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        TOTALSCORECANDY: "TOTALSCORECANDY",
        TOTALSCORECANDY1: "TOTALSCORECANDY1",
        TOTALSCORECANDY2: "TOTALSCORECANDY2",
        TOTALSCORECANDY3: "TOTALSCORECANDY3",
        TOTALCURRENTSCORECANDY: "CURRENTSCORECANDY",
        LEVEL: "LEVEL",
        LEVEL1: "LEVEL1",
        LEVEL2: "LEVEL2",
        LEVEL3: "LEVEL3",
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        supports_local_storage: function() {
            try {
                return localStorage.setItem("test",
                    "test"), localStorage.removeItem("test"), "localStorage" in window && null !== window.localStorage
            } catch (b) {
                return !1
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.commons.common-buttons").requires("impact.entity").defines(function() {
    EntityCommonButtons = ig.Entity.extend({
        ignorePause: !0,
        type: ig.Entity.TYPE.B,
        zIndex: 50,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("up", 1, [0]);
            this.addAnim("down", 1, [1])
        },
        update: function() {
            this.parent();
            this.clickTimer && 0 < this.clickTimer.delta() && (this.currentAnim = this.anims.down);
            this.clickTimer && 0.1 < this.clickTimer.delta() && (this.currentAnim = this.anims.up, this.redirect())
        },
        clicked: function() {
            ig.soundHandler.playSound(ig.soundHandler.SOUNDID.click);
            this.clickTimer = new ig.Timer
        },
        redirect: function() {}
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-play").requires("impact.entity", "game.entities.commons.common-buttons").defines(function() {
    EntityBtnPlay = EntityCommonButtons.extend({
        size: {
            x: 150,
            y: 54
        },
        zIndex: 100,
        animSheet: new ig.AnimationSheet("images/btn-play.png", 150, 54),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.btnMoreGames = ig.game.getEntitiesByType(EntityBtnMoreGames)[0];
            this.gameControl && (this.gameControl.state == this.gameControl.states.MENU && !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.GAMESTART && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0))
        },
        clicked: function() {
			gradle.event('btn_play');
            this.parent();
            //this.gameControl.btnMoreGames && ig.game.hideOverlay([this.gameControl.btnMoreGames.div_layer_name])
        },
        redirect: function() {
            this.gameControl.state = this.gameControl.states.GAMESTART
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: 164
                }
            }, 0.8, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Elastic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: -20
                }
            }, 0.1, {
                onComplete: function() {
                    this.gameControl.btnPlay = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-music").requires("impact.entity").defines(function() {
    EntityBtnMusic = ig.Entity.extend({
        size: {
            x: 110,
            y: 57
        },
        ignorePause: !0,
        type: ig.Entity.TYPE.B,
        zIndex: 650,
        animSheet: new ig.AnimationSheet("images/btn-toggle.png", 110, 57),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("up", 1, [0]);
            this.addAnim("down", 1, [1]);
            this.currentAnim = !0 == ig.soundHandler.buttonChanged ? this.anims.down : this.anims.up
        },
        update: function() {
            this.parent();
            this.checkClickOnPause();
            this.checkOverlapWithPointer();
            ig.game.paused || this.kill()
        },
        clicked: function() {
            !0 == ig.soundHandler.buttonChanged ? (ig.soundHandler.unmute(), ig.soundHandler.buttonChanged = !1, this.currentAnim = this.anims.up) : (ig.soundHandler.mute(), ig.soundHandler.buttonChanged = !0, gradle.event('btn_music'), this.currentAnim = this.anims.down)
        },
        checkClickOnPause: function() {
            ig.game.paused && this.ignorePause && this.checkOverlapWithPointer() && (ig.input.pressed("click") ? this.clicked() : ig.input.released("click") || (this.click = !0))
        },
        checkOverlapWithPointer: function() {
            if (ig.ua.mobile) var b =
                ig.input.mouse.x / widthRatio + ig.game.screen.x,
                c = ig.input.mouse.y / heightRatio + ig.game.screen.y;
            else b = ig.input.mouse.x / multiplier + ig.game.screen.x, c = ig.input.mouse.y / multiplier + ig.game.screen.y;
            return b > this.pos.x + this.size.x || b < this.pos.x || c > this.pos.y + this.size.y || c < this.pos.y ? !1 : !0
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-sound").requires("impact.entity").defines(function() {
    EntityBtnSound = ig.Entity.extend({
        size: {
            x: 110,
            y: 57
        },
        ignorePause: !0,
        type: ig.Entity.TYPE.B,
        zIndex: 650,
        animSheet: new ig.AnimationSheet("images/btn-toggle.png", 110, 57),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("up", 1, [0]);
            this.addAnim("down", 1, [1]);
            this.currentAnim = 1 == Howler._volume ? this.anims.up : this.anims.down
        },
        update: function() {
            this.parent();
            Howler.unmute();
            this.checkClickOnPause();
            this.checkOverlapWithPointer();
            ig.game.paused || this.kill()
        },
        clicked: function() {
            this.currentAnim == this.anims.down ? 
				(Howler._volume = 1, this.currentAnim = this.anims.up) : (Howler._volume = 0, gradle.event('btn_sound'), this.currentAnim = this.anims.down)
        },
        checkClickOnPause: function() {
            ig.game.paused && this.ignorePause && this.checkOverlapWithPointer() && (ig.input.pressed("click") ? this.clicked() : ig.input.released("click") || (this.click = !0))
        },
        checkOverlapWithPointer: function() {
            if (ig.ua.mobile) var b = ig.input.mouse.x / widthRatio + ig.game.screen.x,
                c = ig.input.mouse.y / heightRatio + ig.game.screen.y;
            else b = ig.input.mouse.x / multiplier + ig.game.screen.x, c = ig.input.mouse.y / multiplier + ig.game.screen.y;
            return b > this.pos.x + this.size.x || b < this.pos.x || c > this.pos.y + this.size.y || c < this.pos.y ? !1 : !0
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-back").requires("game.entities.commons.common-buttons").defines(function() {
    EntityBtnBack = EntityCommonButtons.extend({
        size: {
            x: 150,
            y: 54
        },
        zIndex: 650,
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        animSheet: new ig.AnimationSheet("images/btn-back.png", 150, 54),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("up", 1, [0]);
            this.addAnim("down", 1, [1]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.checkClickOnPause();
            this.checkOverlapWithPointer();
            ig.game.paused || this.kill()
        },
        clicked: function() {
            this.parent()
        },
        redirect: function() {
            ig.game.paused && (ig.game.paused = !ig.game.paused);
            this.gameControl.state == this.gameControl.states.MENU && this.gameControl.btnMoreGames && ig.game.showOverlay([this.gameControl.btnMoreGames.div_layer_name])
        },
        checkClickOnPause: function() {
            ig.game.paused && this.ignorePause && this.checkOverlapWithPointer() && (ig.input.pressed("click") ? this.clicked() : ig.input.released("click") ||
                (this.click = !0))
        },
        checkOverlapWithPointer: function() {
            if (ig.ua.mobile) var b = ig.input.mouse.x / widthRatio + ig.game.screen.x,
                c = ig.input.mouse.y / heightRatio + ig.game.screen.y;
            else b = ig.input.mouse.x / multiplier + ig.game.screen.x, c = ig.input.mouse.y / multiplier + ig.game.screen.y;
            return b > this.pos.x + this.size.x || b < this.pos.x || c > this.pos.y + this.size.y || c < this.pos.y ? !1 : !0
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-home").requires("game.entities.commons.common-buttons").defines(function() {
    EntityBtnHome = EntityCommonButtons.extend({
        size: {
            x: 150,
            y: 54
        },
        zIndex: 650,
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        animSheet: new ig.AnimationSheet("images/btn-home.png", 150, 54),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("up", 1, [0]);
            this.addAnim("down", 1, [1]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.checkClickOnPause();
            this.checkOverlapWithPointer();
            ig.game.paused || this.kill()
        },
        clicked: function() {
            this.parent()
        },
        redirect: function() {
            ig.game.paused && (ig.game.paused = !ig.game.paused);
            this.gameControl.btnOptionSmall = !1;
            this.gameControl.lvl1 = !0;
            this.gameControl.lvl2 = !1;
            this.gameControl.state = this.gameControl.states.MENU
        },
        checkClickOnPause: function() {
            ig.game.paused && this.ignorePause && this.checkOverlapWithPointer() && (ig.input.pressed("click") ? this.clicked() : ig.input.released("click") || (this.click = !0))
        },
        checkOverlapWithPointer: function() {
            if (ig.ua.mobile) var b = ig.input.mouse.x / widthRatio + ig.game.screen.x,
                c = ig.input.mouse.y / heightRatio + ig.game.screen.y;
            else b = ig.input.mouse.x / multiplier + ig.game.screen.x, c = ig.input.mouse.y / multiplier + ig.game.screen.y;
            return b > this.pos.x + this.size.x || b < this.pos.x || c > this.pos.y + this.size.y || c < this.pos.y ? !1 : !0
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-option-board").requires("impact.entity", "game.entities.buttons.btn-music", "game.entities.buttons.btn-sound", "game.entities.buttons.btn-back", "game.entities.buttons.btn-home").defines(function() {
    EntityPropOptionBoard = ig.Entity.extend({
        size: {
            x: 376,
            y: 346
        },
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        zIndex: 600,
        musicToggle: null,
        soundToggle: null,
        btnBack: null,
        btnHome: null,
        bgAlpha: 0.5,
        animSheet: new ig.AnimationSheet("images/elem-empty-board.png", 376, 346),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            ig.game.paused || (ig.game.paused = !ig.game.paused)
        },
        update: function() {
            this.parent();
            ig.game.paused || this.kill()
        },
        draw: function() {
            ig.system.context.fillStyle = "rgba(0, 0, 0, " + this.bgAlpha + ")";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this.parent();
            this.textSmall.draw("MUSIC", this.pos.x + 80, this.pos.y + 80);
            this.textSmall.draw("SOUND", this.pos.x +
                80, this.pos.y + 160);
            null == this.musicToggle && (this.musicToggle = ig.game.spawnEntity(EntityBtnMusic, this.pos.x + this.size.x / 2, this.pos.y + 65));
            null == this.soundToggle && (this.soundToggle = ig.game.spawnEntity(EntityBtnSound, this.pos.x + this.size.x / 2, this.pos.y + 145));
            this.gameControl.state == this.gameControl.states.MENU ? null == this.btnBack && (this.btnBack = ig.game.spawnEntity(EntityBtnBack, this.pos.x + 120, this.pos.y + 250)) : (null == this.btnBack && (this.btnBack = ig.game.spawnEntity(EntityBtnBack, this.pos.x + 30, this.pos.y +
                250)), null == this.btnHome && (this.btnHome = ig.game.spawnEntity(EntityBtnHome, this.pos.x + 200, this.pos.y + 250)))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-option").requires("impact.entity", "game.entities.commons.common-buttons", "game.entities.prop.prop-option-board").defines(function() {
    EntityBtnOption = EntityCommonButtons.extend({
        size: {
            x: 150,
            y: 54
        },
        zIndex: 100,
        optionBoard: null,
        animSheet: new ig.AnimationSheet("images/btn-option.png", 150, 54),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl &&
                (this.gameControl.state == this.gameControl.states.MENU && !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.GAMESTART && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0));
            ig.game.paused || (this.optionBoard = null)
        },
        clicked: function() {
            this.parent();
            this.gameControl.state == this.gameControl.states.MENU && (null == this.optionBoard && (this.optionBoard = ig.game.spawnEntity(EntityPropOptionBoard, 50, 180)));
			//this.gameControl.btnMoreGames && ig.game.hideOverlay([this.gameControl.btnMoreGames.div_layer_name]))
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: 164
                }
            }, 0.8, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Elastic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: 500
                }
            }, 0.1, {
                onComplete: function() {
                    this.gameControl.btnOption = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-more-games").requires("game.entities.commons.common-buttons").defines(function() {
    EntityBtnMoreGames = EntityCommonButtons.extend({
        size: {
            x: 200,
            y: 54
        },
        clicked: !1,
        zIndex: 100,
        animSheet: new ig.AnimationSheet("images/btn-more-games.png", 200, 54),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            //this.spawnDiv();
            this.gameControl && (
				this.gameControl.state == this.gameControl.states.MENU && !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), 
				this.gameControl.state == this.gameControl.states.GAMESTART && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0)
			);
        },
        clicked: function() {
			gradle.event('btn_more');
            this.parent();
            //this.clicked = !0
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: 140
                }
            }, 0.8, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Elastic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: 600
                }
            }, 0.1, {
                onComplete: function() {
                    this.gameControl.btnMoreGames = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        },
        ready: function() {
            setTimeout(this.spawnDiv(), 5)
        },
        spawnDiv: function() {
            this.canSpawnDiv || (this.canSpawnDiv = !0, _SETTINGS.MoreGames.Enabled ? 
				console.log('spawndiv') /*, this.checkClickableLayer(this.divLayerName ? this.divLayerName : "more-games", _SETTINGS.MoreGames.Link, !0)*/ : this.kill())
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ?
                (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "images/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var l = window.innerHeight / mobileHeight,
                    p = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", 100);
                $("#" + g.id).css("top", this.pos.y * l);
                $("#" + g.id).css("width", this.size.x *
                    p);
                $("#" + g.id).css("height", this.size.y * l)
            } else l = document.getElementById("game").offsetLeft, p = document.getElementById("game").offsetTop, $("#" + g.id).css("left", l + this.pos.x + 300 * multiplier), $("#" + g.id).css("top", p + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" +
                d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
ig.baked = !0;
ig.module("game.entities.items.item-title").requires("impact.entity").defines(function() {
    EntityItemTitle = ig.Entity.extend({
        size: {
            x: 450,
            y: 220
        },
        type: ig.Entity.TYPE.B,
        zIndex: 50,
        animSheet: new ig.AnimationSheet("images/elem-item-title.png", 450, 220),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl && (this.gameControl.state == this.gameControl.states.MENU &&
                !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.GAMESTART && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0))
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: 70
                }
            }, 0.8, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Elastic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: -100
                }
            }, 0.1, {
                onComplete: function() {
                    this.gameControl.mainTitle = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-border-top").requires("impact.entity").defines(function() {
    EntityPropBorderTop = ig.Entity.extend({
        size: {
            x: 480,
            y: 75
        },
        type: ig.Entity.TYPE.B,
        zIndex: 200,
        animSheet: new ig.AnimationSheet("images/elem-item-border-top.png", 480, 75),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl && (this.gameControl.state == this.gameControl.states.GAMESTART && !this.IN &&
                (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.MENU && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0))
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: 0
                }
            }, 0.5, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: -75
                }
            }, 0.3, {
                onComplete: function() {
                    this.gameControl.topBorder = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-clock").requires("impact.entity").defines(function() {
    EntityPropClock = ig.Entity.extend({
        size: {
            x: 381,
            y: 61
        },
        type: ig.Entity.TYPE.B,
        zIndex: 200,
        ignorePause: !0,
        duration: 0.5,
        strength: 2,
        min: 2,
        animSheet: new ig.AnimationSheet("images/elem-clock.png", 381, 61),
        bar: new ig.Image("images/elem-bar.png"),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            this.gameTimer = new ig.Timer
        },
        update: function() {
            this.parent();
            this.shock();
            ig.game.paused ? this.gameTimer.pause() : this.gameTimer.unpause();
            this.gameControl.state == this.gameControl.states.MENU && this.kill();
            100 >= this.gameControl.gauge && 1 <= this.gameControl.gauge && this.initShock()
        },
        initShock: function() {
            ig.game.paused || (this.shockTimer = new ig.Timer, this.shockTimer.set(this.duration))
        },
        resetShock: function() {
            this.stopShake = !0
        },
        shock: function() {
            if (this.shockTimer && -0.2 > this.shockTimer.delta()) {
                var b = this.shockTimer.delta(),
                    c = this.strength * Math.pow(-b / this.duration, 2);
                0.5 < c && (this.pos.x += Math.random().map(0, 1, -c, c), this.pos.y += Math.random().map(0, 1, -c, c))
            } - 0.4 < b && (this.resetShock(), this.pos.x = this.pos.x, this.pos.y = this.pos.y)
        },
        formatTime: function(b) {
            if (!isNaN(b)) {
                var c = Math.floor(b / 60) % 60;
                b %= 60;
                10 > b && (b = "0" + b);
                return c + ":" + b
            }
        },
        draw: function() {
            var b = ig.system.context;
            this.gameTimer.delta().round(0);
            var c = Math.ceil(60 * (1 + this.min) - this.gameTimer.delta());
            0 <= this.gameControl.gauge && b.drawImage(this.bar.data, 0, 0, 333, 18,
                this.pos.x + 17, this.pos.y + 20, this.gameControl.gauge, 18);
            this.parent();
            this.gameTimer && (0 > this.min ? (this.textSmall.draw("0:00", this.pos.x + 170, this.pos.y - 15), this.gameControl.gauge = 0) : this.textSmall.draw(this.formatTime(c), 0.5 * ig.system.width, this.pos.y - 15, ig.Font.ALIGN.CENTER));
            this.gameTimer && 60 <= this.gameTimer.delta() && (this.min--, this.gameTimer.reset())
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-border-bottom").requires("impact.entity", "game.entities.prop.prop-clock").defines(function() {
    EntityPropBorderBottom = ig.Entity.extend({
        size: {
            x: 480,
            y: 104
        },
        type: ig.Entity.TYPE.B,
        zIndex: 50,
        animSheet: new ig.AnimationSheet("images/elem-item-border-bottom.png", 480, 104),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            this.clock = ig.game.spawnEntity(EntityPropClock, this.pos.x,
                this.pos.y)
        },
        update: function() {
            this.parent();
            this.gameControl && (this.gameControl.state == this.gameControl.states.GAMESTART && !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.MENU && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0));
            this.clock && (this.clock.pos.x = this.pos.x + 32, this.clock.pos.y = this.pos.y + 28)
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: 536
                }
            }, 0.5, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: 640
                }
            }, 0.3, {
                onComplete: function() {
                    this.gameControl.bottomBorder = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-board").requires("impact.entity").defines(function() {
    EntityPropBoard = ig.Entity.extend({
        size: {
            x: 400,
            y: 400
        },
        type: ig.Entity.TYPE.B,
        zIndex: 50,
        animSheet: new ig.AnimationSheet("images/elem-item-board.png", 400, 400),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl && (this.gameControl.state == this.gameControl.states.GAMESTART &&
                !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.MENU && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0))
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: 150
                }
            }, 0.5, {
                onComplete: function() {
                    this.gameControl.state = this.gameControl.states.GAMERUN
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: -400
                }
            }, 0.3, {
                onComplete: function() {
                    this.gameControl.Board = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-score").requires("impact.entity").defines(function() {
    EntityPropScore = ig.Entity.extend({
        size: {
            x: 392,
            y: 129
        },
        type: ig.Entity.TYPE.B,
        zIndex: 250,
        animSheet: new ig.AnimationSheet("images/elem-item-score.png", 392, 129),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl &&
                (this.gameControl.state == this.gameControl.states.GAMESTART && !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.MENU && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0))
        },
        draw: function() {
            this.parent();
            this.textSmall.draw(this.gameControl.score, this.pos.x + 110, this.pos.y + 12, ig.Font.ALIGN.LEFT)
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: 10
                }
            }, 0.5, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm ||
                this.tween({
                    pos: {
                        y: -129
                    }
                }, 0.2, {
                    onComplete: function() {
                        this.gameControl.propScore = !1;
                        this.kill()
                    }.bind(this),
                    easing: ig.Tween.Easing.Linear.EaseNone,
                    delay: 0
                }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.effects.spark").requires("impact.entity").defines(function() {
    EntitySpark = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        animSheet: new ig.AnimationSheet("images/spark.png", 64, 64),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("spark", 0.03, [0, 1, 2, 3, 4])
        },
        update: function() {
            this.parent();
            this.currentAnim == this.anims.spark && this.currentAnim.loopCount && this.kill()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.effects.bomb").requires("impact.entity").defines(function() {
    EntityBomb = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        offset: {
            x: 65,
            y: 60
        },
        animSheet: new ig.AnimationSheet("images/bomb-effect.png", 192, 192),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("bomb", 0.05, [0, 1, 2, 3, 4])
        },
        update: function() {
            this.parent();
            this.currentAnim == this.anims.bomb && this.currentAnim.loopCount && this.kill()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-target-board").requires("impact.entity").defines(function() {
    EntityPropTargetBoard = ig.Entity.extend({
        size: {
            x: 376,
            y: 346
        },
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        zIndex: 600,
        clicked: !1,
        bgAlpha: 0.5,
        animSheet: new ig.AnimationSheet("images/elem-empty-board.png", 376, 346),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        item0: new ig.Image("images/elem-ch-ball-springkles.png"),
        item1: new ig.Image("images/elem-purple.png"),
        item2: new ig.Image("images/elem-ch-oval.png"),
        item3: new ig.Image("images/elem-yellow.png"),
        item4: new ig.Image("images/elem-ch-square-stripes.png"),
        item5: new ig.Image("images/elem-green.png"),
        item6: new ig.Image("images/elem-orange.png"),
        item7: new ig.Image("images/elem-purple-stripes.png"),
        item8: new ig.Image("images/elem-ch-ball-stripes.png"),
        item9: new ig.Image("images/elem-ch-square-2x.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.tweenIn();
            ig.soundHandler.playSound(ig.soundHandler.SOUNDID.board);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            this.gameControl.gameStart = !1;
            ig.game.paused || (ig.game.paused = !ig.game.paused, this.gameControl.gameStart = !1)
        },
        update: function() {
            this.parent();
            ig.input.pressed("click") && ig.game.paused && this.clicked && (this.clicked = !1, this.tweenOut())
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                    pos: {
                        y: 180
                    }
                },
                1, {
                    onComplete: function() {
                        this.clicked = !0
                    }.bind(this),
                    easing: ig.Tween.Easing.Elastic.EaseOut,
                    delay: 0
                }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: -400
                }
            }, 0.6, {
                onComplete: function() {
                    this.gameControl.isFinishedChecking = !0;
                    ig.game.paused = !ig.game.paused;
                    this.gameControl.gameStart = !0;
                    this.gameControl.isFinishedChecking = !0;
                    this.gameControl.isDragging = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Quadratic.EaseOut,
                delay: 0
            }).start()
        },
        draw: function() {
            ig.system.context.fillStyle = "rgba(0, 0, 0, " +
                this.bgAlpha + ")";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this.parent();
            this.textSmall.draw("LEVEL " + this.gameControl.level, this.pos.x + 185, this.pos.y + 60, ig.Font.ALIGN.CENTER);
            this.textSmall.draw("Collect These Candies", this.pos.x + 185, this.pos.y + 100, ig.Font.ALIGN.CENTER);
            0 == this.gameControl.item1.itemType && this.item0.draw(this.pos.x + 50, this.pos.y + 150);
            1 == this.gameControl.item1.itemType && this.item1.draw(this.pos.x + 50, this.pos.y + 150);
            2 == this.gameControl.item1.itemType && this.item2.draw(this.pos.x +
                50, this.pos.y + 150);
            3 == this.gameControl.item1.itemType && this.item3.draw(this.pos.x + 50, this.pos.y + 150);
            4 == this.gameControl.item1.itemType && this.item4.draw(this.pos.x + 50, this.pos.y + 150);
            5 == this.gameControl.item1.itemType && this.item5.draw(this.pos.x + 50, this.pos.y + 150);
            6 == this.gameControl.item1.itemType && this.item6.draw(this.pos.x + 50, this.pos.y + 150);
            7 == this.gameControl.item1.itemType && this.item7.draw(this.pos.x + 50, this.pos.y + 150);
            8 == this.gameControl.item1.itemType && this.item8.draw(this.pos.x + 50, this.pos.y +
                150);
            9 == this.gameControl.item1.itemType && this.item9.draw(this.pos.x + 50, this.pos.y + 150);
            0 == this.gameControl.item2.itemType && this.item0.draw(this.pos.x + 120, this.pos.y + 150);
            1 == this.gameControl.item2.itemType && this.item1.draw(this.pos.x + 120, this.pos.y + 150);
            2 == this.gameControl.item2.itemType && this.item2.draw(this.pos.x + 120, this.pos.y + 150);
            3 == this.gameControl.item2.itemType && this.item3.draw(this.pos.x + 120, this.pos.y + 150);
            4 == this.gameControl.item2.itemType && this.item4.draw(this.pos.x + 120, this.pos.y + 150);
            5 == this.gameControl.item2.itemType && this.item5.draw(this.pos.x + 120, this.pos.y + 150);
            6 == this.gameControl.item2.itemType && this.item6.draw(this.pos.x + 120, this.pos.y + 150);
            7 == this.gameControl.item2.itemType && this.item7.draw(this.pos.x + 120, this.pos.y + 150);
            8 == this.gameControl.item2.itemType && this.item8.draw(this.pos.x + 120, this.pos.y + 150);
            9 == this.gameControl.item2.itemType && this.item9.draw(this.pos.x + 120, this.pos.y + 150);
            0 == this.gameControl.item3.itemType && this.item0.draw(this.pos.x + 190, this.pos.y + 150);
            1 ==
                this.gameControl.item3.itemType && this.item1.draw(this.pos.x + 190, this.pos.y + 150);
            2 == this.gameControl.item3.itemType && this.item2.draw(this.pos.x + 190, this.pos.y + 150);
            3 == this.gameControl.item3.itemType && this.item3.draw(this.pos.x + 190, this.pos.y + 150);
            4 == this.gameControl.item3.itemType && this.item4.draw(this.pos.x + 190, this.pos.y + 150);
            5 == this.gameControl.item3.itemType && this.item5.draw(this.pos.x + 190, this.pos.y + 150);
            6 == this.gameControl.item3.itemType && this.item6.draw(this.pos.x + 190, this.pos.y + 150);
            7 == this.gameControl.item3.itemType &&
                this.item7.draw(this.pos.x + 190, this.pos.y + 150);
            8 == this.gameControl.item3.itemType && this.item8.draw(this.pos.x + 190, this.pos.y + 150);
            9 == this.gameControl.item3.itemType && this.item9.draw(this.pos.x + 190, this.pos.y + 150);
            0 == this.gameControl.item4.itemType && this.item0.draw(this.pos.x + 260, this.pos.y + 150);
            1 == this.gameControl.item4.itemType && this.item1.draw(this.pos.x + 260, this.pos.y + 150);
            2 == this.gameControl.item4.itemType && this.item2.draw(this.pos.x + 260, this.pos.y + 150);
            3 == this.gameControl.item4.itemType && this.item3.draw(this.pos.x +
                260, this.pos.y + 150);
            4 == this.gameControl.item4.itemType && this.item4.draw(this.pos.x + 260, this.pos.y + 150);
            5 == this.gameControl.item4.itemType && this.item5.draw(this.pos.x + 260, this.pos.y + 150);
            6 == this.gameControl.item4.itemType && this.item6.draw(this.pos.x + 260, this.pos.y + 150);
            7 == this.gameControl.item4.itemType && this.item7.draw(this.pos.x + 260, this.pos.y + 150);
            8 == this.gameControl.item4.itemType && this.item8.draw(this.pos.x + 260, this.pos.y + 150);
            9 == this.gameControl.item4.itemType && this.item9.draw(this.pos.x + 260,
                this.pos.y + 150)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.item").requires("impact.entity", "game.entities.effects.spark", "game.entities.effects.bomb", "game.entities.prop.prop-target-board").defines(function() {
    EntityItem = ig.Entity.extend({
        zIndex: 100,
        type: ig.Entity.TYPE.B,
        candyBonus: 10,
        thisScale: !1,
        waitTimer: new ig.Timer,
        initialScale: {
            x: 1,
            y: 1
        },
        targetScale: {
            x: 1,
            y: 1
        },
        currentScale: {
            x: 1,
            y: 1
        },
        scaleIncrements: 0.025,
        scaleAxis: {
            xAxis: !1,
            yAxis: !1
        },
        changeSize: !0,
        itemObject: [{
                animSheet: new ig.AnimationSheet("images/elem-ch-ball-springkles.png", 64,
                    64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-purple.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-ch-oval.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-yellow.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-ch-square-stripes.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-green.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-orange.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-purple-stripes.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-ch-ball-stripes.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            },
            {
                animSheet: new ig.AnimationSheet("images/elem-ch-square-2x.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !0
            }, {
                animSheet: new ig.AnimationSheet("images/elem-bomb.png", 64, 64),
                frameArray: [0],
                loop: !1,
                canChain: !1
            }
        ],
        posOffset: 3,
        gridCoords: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        isDragging: !1,
        isUpdated: !1,
        isMatched: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            0 >=
                this.gridCoords.x && (this.gridCoords.x = 0);
            0 >= this.gridCoords.y && (this.gridCoords.y = 0);
            this.parent(b, c, d);
            this.size.x -= 2 * this.offset.x;
            this.size.y -= 2 * this.offset.y;
            this.pos.x += this.posOffset;
            this.pos.y += this.posOffset;
            this.animSheet = this.itemObject[this.item].animSheet;
            this.addAnim("idle", 1, [0], !0);
            this.currentAnim = this.anims.idle;
            this.waitTimer.set();
            this.mother.amount[this.originalID]++;
            10 <= this.item && this.mother.powerUpsSpawned++;
            10 > this.item && this.setScale(1E-4, 1E-4)
        },
        update: function() {
            this.parent();
            ig.input.state("click") || this.released();
            if (this.mother)
                if (this.mother.gameEnded)
                    if (this.ignoreEnd) this.parent();
                    else return;
            else this.parent();
            else this.parent();
            if (this.pointer.hoveringItem === this && this.mother.inMassacreMode) {
                if (9 > this.item || 9 === this.item) return this.mother.hovering = this.item;
                this.mother.hovering = null
            } else {
                if (this.isDragging) {
                    var b = this.offsetToMouse.x + this.pointer.pos.x,
                        c = this.offsetToMouse.y + this.pointer.pos.y;
                    this.pos.x = this.pointer.pos.x + 0.5 * this.pointer.size.x - 0.5 * this.size.x;
                    this.pos.y = this.pointer.pos.y + 0.5 * this.pointer.size.y - 0.5 * this.size.y;
                    if (b < this.mother.gridPos.x) this.pos.x = this.mother.gridPos.x;
                    else if (b > this.mother.gridPos.x + this.mother.tileSize.x * (this.mother.gridSize.x - 1) + 2 * this.posOffset) this.pos.x = this.mother.gridPos.x + this.mother.tileSize.x * (this.mother.gridSize.x - 1) + 2 * this.posOffset;
                    else if (b < this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x - 1) + 2 * this.posOffset) this.pos.x = this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x - 1) +
                        2 * this.posOffset;
                    else if (b > this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x + 1) + 2 * this.posOffset) this.pos.x = this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x + 1) + 2 * this.posOffset;
                    else if (b < this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x - 0.25) + 2 * this.posOffset) {
                        if (c < this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y - 0.25) + 2 * this.posOffset || c > this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y + 0.25) + 2 * this.posOffset) this.pos.x = this.mother.gridPos.x +
                            this.mother.tileSize.x * this.gridCoords.x + 2 * this.posOffset
                    } else if (b > this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x + 0.25) + 2 * this.posOffset) {
                        if (c < this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y - 0.25) + 2 * this.posOffset || c > this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y + 0.25) + 2 * this.posOffset) this.pos.x = this.mother.gridPos.x + this.mother.tileSize.x * this.gridCoords.x + 2 * this.posOffset
                    } else this.pos.x = b;
                    if (c < this.mother.gridPos.y) this.pos.y = this.mother.gridPos.y;
                    else if (c > this.mother.gridPos.y + this.mother.tileSize.y * (this.mother.gridSize.y - 1) + 2 * this.posOffset) this.pos.y = this.mother.gridPos.y + this.mother.tileSize.y * (this.mother.gridSize.y - 1) + 2 * this.posOffset;
                    else if (c < this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y - 1) + 2 * this.posOffset) this.pos.y = this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y - 1) + 2 * this.posOffset;
                    else if (c > this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y + 1) + 2 * this.posOffset) this.pos.y = this.mother.gridPos.y +
                        this.mother.tileSize.y * (this.gridCoords.y + 1) + 2 * this.posOffset;
                    else if (c < this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y - 0.5) + 2 * this.posOffset) {
                        if (b < this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x - 0.5) + 2 * this.posOffset || b > this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x + 0.5) + 2 * this.posOffset) this.pos.y = this.mother.gridPos.y + this.mother.tileSize.y * this.gridCoords.y + 2 * this.posOffset
                    } else if (c > this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y +
                            0.5) + 2 * this.posOffset) {
                        if (b < this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x - 0.5) + 2 * this.posOffset || b > this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x + 0.5) + 2 * this.posOffset) this.pos.y = this.mother.gridPos.y + this.mother.tileSize.y * this.gridCoords.y + 2 * this.posOffset
                    } else this.pos.y = c;
                    if (b < this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x - 0.5) + 2 * this.posOffset && c < this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y - 0.5) + 2 * this.posOffset || b < this.mother.gridPos.x +
                        this.mother.tileSize.x * (this.gridCoords.x - 0.5) + 2 * this.posOffset && c > this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y + 0.5) + 2 * this.posOffset || b > this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x + 0.5) + 2 * this.posOffset && c < this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y - 0.5) + 2 * this.posOffset || b > this.mother.gridPos.x + this.mother.tileSize.x * (this.gridCoords.x + 0.5) + 2 * this.posOffset && c > this.mother.gridPos.y + this.mother.tileSize.y * (this.gridCoords.y + 0.5) + 2 * this.posOffset) this.pos.x =
                        this.mother.gridPos.x + this.mother.tileSize.x * this.gridCoords.x + 2 * this.posOffset, this.pos.y = this.mother.gridPos.y + this.mother.tileSize.y * this.gridCoords.y + 2 * this.posOffset, this.released();
                    this.mother.lastDrag = this;
                    this.mother.lastDragGridPos = this.gridCoords;
                    this.mother.checkTilePos(this)
                } else this.doDrop && this.mother.matchTimer && (b = this.mother.matchTimer.delta(), this.mother.isFinishedChecking = !1, 0.1 < b ? this.isNewPiece = this.doDrop = !1 : 0.03 < b && null === this.mother.grid[this.gridCoords.y][this.gridCoords.x] &&
                    (this.mother.grid[this.gridCoords.y][this.gridCoords.x] = this, b = this.gridCoords.y * this.mother.tileSize.y + this.mother.gridPos.y + this.posOffset, this.mother.isMoving = this, this.tween({
                        pos: {
                            y: b
                        }
                    }, (b - this.pos.y) / (this.size.y + 2 * this.offset.y) / 8, {
                        onComplete: function() {
                            this.mother.isMoving = null;
                            this.mother.dropCount -= 1;
                            0 === this.mother.dropCount && (this.playDropSound = !1);
                            this.mother.isFinishedChecking = !0
                        }.bind(this)
                    }).start()));
                if (10 <= this.originalID && this.isTriggering && !this.isTriggered && (this.offset.x += Math.random(),
                        this.offset.x -= Math.random(), 0 > this.offset.x || 2 < this.offset.x)) this.offset.x = 1;
                10 == this.item && (0.9 <= this.scale.x && this.changeSize && (this.setScale(), this.scale.x -= 0.01, this.scale.y -= 0.01), 1.1 >= this.scale.x && !this.changeSize && (this.setScale(), this.scale.x += 0.01, this.scale.y += 0.01), 0.9 >= this.scale.x && (this.changeSize = !1), 1.11 <= this.scale.x && (this.changeSize = !0), 0.9 >= this.scale.y && (this.scale.y += 0.01));
                10 > this.item && 1 > this.scale.x && (this.setScale(), this.scale.x += 0.07, this.scale.y += 0.07);
                !0 == this.changeLevel &&
                    0.9999 <= this.scale.x && !ig.game.paused && (0 == ig.game.getEntitiesByType(EntityPropTargetBoard).length && ig.game.spawnEntity(EntityPropTargetBoard, 50, 600), this.changeLevel = !1)
            }
        },
        clicked: function() {
            if (!this.changeLevel && !0 == this.gameControl.gameStart && !0 == this.gameControl.isFinishedChecking && !1 == this.gameControl.isDragging && !this.doDrop && null == this.mother.matchTimer) {
                if (!ig.game.paused)
                    if (10 > this.item) this.mother.confirmHovering !== this.item || this.mother.confirmHovering !== this.mother.hovering ? (this.mother.confirmHovering =
                        this.item, this.mother.canSelect = !1) : this.mother.canSelect = this.mother.confirmHovering == this.item && this.mother.confirmHovering == this.mother.hovering ? !0 : !1;
                    else if (10 == this.item) {
                    if (this.mother.confirmHovering !== this.item || this.mother.confirmHovering !== this.mother.hovering) 0 == ig.game.getEntitiesByType(EntityBomb).length && ig.game.spawnEntity(EntityBomb, this.pos.x, this.pos.y, {
                        zIndex: this.zIndex + 1
                    }), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.bomb), this.triggerPowerUp(), this.startTime = null, this.isDragging = !1, this.mother.isDragging = !1, this.mother.startMakeMove();
                    return
                }!this.mother.isDragging && !this.mother.ending && (this.offsetToMouse = {
                    x: this.pos.x - this.pointer.pos.x,
                    y: this.pos.y - this.pointer.pos.y
                }, this.isDragging = !0, this.mother.isDragging = this, this.zIndex += 50, ig.game.sortEntitiesDeferred())
            }
        },
        released: function() {
            if (this.isDragging) {
                this.mother.checkTilePos(this);
                try {
                    this.mother.isFinishedChecking = !0
                } catch (b) {
                    console.log(b)
                }
                this.isDragging = !1;
                this.mother.isDragging = !1;
                this.pos.x = this.gridCoords.x * this.mother.tileSize.x +
                    this.mother.gridPos.x + this.posOffset;
                this.pos.y = this.gridCoords.y * this.mother.tileSize.y + this.mother.gridPos.y + this.posOffset;
                this.zIndex -= 50;
                this.isUpdated && (this.mother.startMakeMove(), this.isUpdated = !1)
            }
        },
        kill: function() {
            this.parent();
            this.gameControl.hintTimer.reset();
            this.mother.amount[this.originalID]--;
            this.spark = ig.game.spawnEntity(EntitySpark, this.pos.x, this.pos.y);
            10 == this.item && (this.mother.isFinishedChecking = !0, this.mother.gameStart = !0, this.mother.canSelect = !0);
            !1 == this.gameControl.isReseting &&
                (this.gameControl.score += this.candyBonus, this.originalID == this.gameControl.item1.itemType && (this.gameControl.candy1 -= 1), this.originalID == this.gameControl.item2.itemType && (this.gameControl.candy2 -= 1), this.originalID == this.gameControl.item3.itemType && (this.gameControl.candy3 -= 1), this.originalID == this.gameControl.item4.itemType && (this.gameControl.candy4 -= 1))
        },
        matchOther: function(b, c) {
            0 <= b && b < this.mother.gridSize.y && 0 <= c && c < this.mother.gridSize.x && 9 >= this.mother.grid[b][c].originalID && (this.mother.grid[b][c].item =
                this.item, this.mother.grid[b][c].isMatched = !0)
        },
        triggerPowerUp: function() {
            this.mother.matchChain = 0;
            if (!(9 > this.item) && !this.isTriggered && (this.isTriggered = !0, 10 <= this.item)) {
                for (var b = this.gridCoords.y - 1; b < this.gridCoords.y + 2; ++b)
                    for (var c = this.gridCoords.x - 1; c < this.gridCoords.x + 2; ++c) this.matchOther(b, c, this.item);
                this.isMatched = !0
            }
        },
        draw: function() {
            if (this.isNewPiece && this.mother.matchTimer) {
                var b = this.mother.matchTimer.delta();
                if (-0.1 < b) ig.system.context.globalAlpha = 1 + 10 * b;
                else return
            } else if (this.killTimer) {
                b =
                    this.killTimer.delta();
                if (0 < b) {
                    this.killTimer = null;
                    this.kill();
                    return
                }
                ig.system.context.globalAlpha = -0.125 < b ? 8 * -b : 1
            } else if (this.mother.doDrawOverlay || this.mother.overlayTimer) ig.system.context.globalAlpha = this.mother.overlayTimer ? this.mother.doDrawOverlay ? 0.5 - 2 * this.mother.overlayTimer.delta() : 1 + 2 * this.mother.overlayTimer.delta() : 0.5;
            this.parent();
            ig.system.context.globalAlpha = 1
        },
        _checkScale: function() {
            this.scaleAxis.yAxis && this.scaleAxis.xAxis ? this.setScale(this.currentScale.x, this.currentScale.y) :
                this.scaleAxis.yAxis ? this.setScale(1, this.currentScale.y) : this.scaleAxis.xAxis ? this.setScale(this.currentScale.x, 1) : this.setScale(this.currentScale.x, this.currentScale.y)
        },
        onCompleteScaleX: function() {},
        onCompleteScaleY: function() {},
        checkIfNeedToScale: function() {
            if (this.targetScale.x > this.initialScale.x)
                if (this.currentScale.x < this.targetScale.x) this.currentScale.x += this.scaleIncrements;
                else this.onCompleteScaleX();
            else if (this.currentScale.x > this.targetScale.x) this.currentScale.x -= this.scaleIncrements;
            else this.onCompleteScaleX();
            this._checkScale();
            if (this.targetScale.y > this.initialScale.y)
                if (this.currentScale.y < this.targetScale.y) this.currentScale.y += this.scaleIncrements;
                else this.onCompleteScaleY();
            else if (this.currentScale.y > this.targetScale.y) this.currentScale.y -= this.scaleIncrements;
            else this.onCompleteScaleY();
            this._checkScale()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-option-small").requires("impact.entity", "game.entities.prop.prop-option-board").defines(function() {
    EntityBtnOptionSmall = ig.Entity.extend({
        size: {
            x: 60,
            y: 60
        },
        type: ig.Entity.TYPE.B,
        zIndex: 100,
        optionBoard: null,
        animSheet: new ig.AnimationSheet("images/btn-option-small.png", 60, 60),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.candy = ig.game.getEntitiesByType(EntityItem)[0];
            this.gameControl.state == this.gameControl.states.MENU && this.kill();
            ig.game.paused || (this.optionBoard = null)
        },
        clicked: function() {
            !ig.game.paused && !0 == this.gameControl.isFinishedChecking && (ig.soundHandler.playSound(ig.soundHandler.SOUNDID.click), null == this.optionBoard && (this.optionBoard = ig.game.spawnEntity(EntityPropOptionBoard, 50, 180)))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.targets").requires("impact.entity").defines(function() {
    EntityTargets = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        zIndex: 300,
        itemType: 0,
        types: {
            item0: 0,
            item1: 1,
            item2: 2,
            item3: 3,
            item4: 4,
            item5: 5,
            item6: 6,
            item7: 7,
            item8: 8,
            item9: 9
        },
        item0: new ig.Image("images/elem-ch-ball-springkles.png"),
        item1: new ig.Image("images/elem-purple.png"),
        item2: new ig.Image("images/elem-ch-oval.png"),
        item3: new ig.Image("images/elem-yellow.png"),
        item4: new ig.Image("images/elem-ch-square-stripes.png"),
        item5: new ig.Image("images/elem-green.png"),
        item6: new ig.Image("images/elem-orange.png"),
        item7: new ig.Image("images/elem-purple-stripes.png"),
        item8: new ig.Image("images/elem-ch-ball-stripes.png"),
        item9: new ig.Image("images/elem-ch-square-2x.png"),
        checkOK: new ig.Image("images/elem-checkOK.png"),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl.state == this.gameControl.states.MENU && (this.gameControl.targetCandy = !1, this.kill());
            this.changeLevel && (this.changeLevel = !1, this.kill())
        },
        draw: function() {
            this.parent();
            switch (this.itemType) {
                case this.types.item0:
                    this.item0.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item1:
                    this.item1.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item2:
                    this.item2.draw(this.pos.x,
                        this.pos.y);
                    break;
                case this.types.item3:
                    this.item3.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item4:
                    this.item4.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item5:
                    this.item5.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item6:
                    this.item6.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item7:
                    this.item7.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item8:
                    this.item8.draw(this.pos.x, this.pos.y);
                    break;
                case this.types.item9:
                    this.item9.draw(this.pos.x, this.pos.y)
            }
            this.gameControl.targetCandy &&
                this.gameControl.item1 && (this.gameControl.item2 && this.gameControl.item3) && (1 <= this.gameControl.candy1 ? this.textSmall.draw(this.gameControl.candy1, this.gameControl.item1.pos.x, 100) : this.checkOK.draw(this.gameControl.item1.pos.x, 100), 1 <= this.gameControl.candy2 ? this.textSmall.draw(this.gameControl.candy2, this.gameControl.item2.pos.x, 100) : this.checkOK.draw(this.gameControl.item2.pos.x, 100), 1 <= this.gameControl.candy3 ? this.textSmall.draw(this.gameControl.candy3, this.gameControl.item3.pos.x, 100) : this.checkOK.draw(this.gameControl.item3.pos.x,
                    100), this.gameControl.item4 && (1 <= this.gameControl.candy4 ? this.textSmall.draw(this.gameControl.candy4, this.gameControl.item4.pos.x, 100) : this.checkOK.draw(this.gameControl.item4.pos.x, 100)));
            this.textSmall.draw("LEVEL " + this.gameControl.level, 350, 30, ig.Font.ALIGN.LEFT)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-end-board").requires("impact.entity").defines(function() {
    EntityPropEndBoard = ig.Entity.extend({
        size: {
            x: 376,
            y: 346
        },
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        zIndex: 600,
        isEnd: !1,
        bgAlpha: 0.5,
        animSheet: new ig.AnimationSheet("images/elem-empty-board.png", 376, 346),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
			gradle.event('enter_game_end');
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.tweenIn();
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            this.candy = ig.game.getEntitiesByType(EntityItem)[0];
            ig.game.sortEntitiesDeferred();
            ig.game.paused || (ig.game.paused = !ig.game.paused);
            ig.soundHandler.playSound(ig.soundHandler.SOUNDID.board)
        },
        update: function() {
            this.parent();
            ig.input.pressed("click") && ig.game.paused && this.isEnd && (this.gameControl.isFinishedChecking = !0, this.gameControl.gameStart = !0, this.gameControl.isDragging = !1, this.gameControl.matchTimer = null, this.candy.doDrop = !1, this.candy.changeLevel = !1, ig.game.paused = !ig.game.paused, this.gameControl.state = this.gameControl.states.MENU, gradle.event('game_end'), this.gameControl.gameStart = !0, this.kill())
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: 180
                }
            }, 1.2, {
                onComplete: function() {
                    this.isEnd = !0
                }.bind(this),
                easing: ig.Tween.Easing.Elastic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    y: -180
                }
            }, 1, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Elastic.EaseOut,
                delay: 0
            }).start()
        },
        draw: function() {
            ig.system.context.fillStyle = "rgba(0, 0, 0, " + this.bgAlpha + ")";
            ig.system.context.fillRect(0,
                0, ig.system.width, ig.system.height);
            this.parent();
            this.textSmall.draw("GAME OVER", this.pos.x + 190, this.pos.y + 80, ig.Font.ALIGN.CENTER);
            this.textSmall.draw("LEVEL", this.pos.x + 70, this.pos.y + 150, ig.Font.ALIGN.LEFT);
            this.textSmall.draw(this.gameControl.level, this.pos.x + 300, this.pos.y + 150, ig.Font.ALIGN.RIGHT);
            this.textSmall.draw("SCORE", this.pos.x + 70, this.pos.y + 200, ig.Font.ALIGN.LEFT);
            this.textSmall.draw(this.gameControl.score, this.pos.x + 300, this.pos.y + 200, ig.Font.ALIGN.RIGHT)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.items.item-board-noMove").requires("impact.entity").defines(function() {
    EntityItemBoardNoMove = ig.Entity.extend({
        size: {
            x: 480,
            y: 140
        },
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        zIndex: 600,
        animSheet: new ig.AnimationSheet("images/elem-item-board-midle.png", 480, 140),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            ig.game.sortEntitiesDeferred();
            ig.game.paused || (ig.game.paused = !ig.game.paused);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            this.gameControl.gameStart = !1;
            this.tweenIn()
        },
        update: function() {
            this.parent()
        },
        tweenIn: function() {
            this.tween({
                pos: {
                    y: 250
                }
            }, 1, {
                onComplete: function() {
                    this.tweenOut()
                }.bind(this),
                easing: ig.Tween.Easing.Quadratic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            this.tween({
                pos: {
                    y: -300
                }
            }, 0.8, {
                onComplete: function() {
                    this.gameControl.hintTimer.reset();
                    this.gameControl.isFinishedChecking = !0;
                    ig.game.paused && (this.gameControl.gameStart = !0,
                        this.gameControl.isFinishedChecking = !0, this.gameControl.isDragging = !1, ig.game.paused = !ig.game.paused);
                    this.gameControl.resetGrid();
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Quadratic.EaseIn,
                delay: 0.5
            }).start()
        },
        draw: function() {
            this.parent();
            this.textSmall.draw("No more moves", this.pos.x + 150, this.pos.y + 50)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.effects.hint").requires("impact.entity").defines(function() {
    EntityHint = ig.Entity.extend({
        size: {
            x: 70,
            y: 70
        },
        zIndex: 200,
        offset: {
            x: 13,
            y: 0
        },
        animSheet: new ig.AnimationSheet("images/hint.png", 70, 70),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 0.1, [0, 1, 2, 3, 4, 3, 2, 1]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl.state != this.gameControl.states.GAMERUN && this.kill()
        },
        changeAngle: function() {
            this.currentAnim.angle =
                1.55
        }
    })
});
ig.baked = !0;
ig.module("game.entities.prop.prop-board-score").requires("game.entities.commons.common-storage", "game.entities.buttons.btn-back").defines(function() {
    EntityPropBoardScore = EntityCommonStorage.extend({
        size: {
            x: 376,
            y: 346
        },
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        zIndex: 600,
        isEnd: !1,
        bgAlpha: 0.5,
        animSheet: new ig.AnimationSheet("images/elem-empty-board.png", 376, 346),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            ig.game.paused || (ig.game.paused = !ig.game.paused);
            ig.soundHandler.playSound(ig.soundHandler.SOUNDID.board)
        },
        update: function() {
            this.parent();
            ig.game.paused || (this.gameControl.gameStart = !0, this.gameControl.isFinishedChecking = !0, this.gameControl.isDragging = !1, this.kill())
        },
        draw: function() {
            ig.system.context.fillStyle = "rgba(0, 0, 0, " + this.bgAlpha + ")";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this.parent();
            0 ==
                ig.game.getEntitiesByType(EntityBtnBack).length && (this.btnBack = ig.game.spawnEntity(EntityBtnBack, this.pos.x + 110, this.pos.y + 260));
            this.textSmall.draw("High Scores", this.pos.x + 150, this.pos.y + 50, ig.Font.ALIGN.CENTER);
            this.textSmall.draw("Level", this.pos.x + 300, this.pos.y + 50, ig.Font.ALIGN.CENTER);
            this.textSmall.draw("1.", this.pos.x + 30, this.pos.y + 100, ig.Font.ALIGN.LEFT);
            this.textSmall.draw("2.", this.pos.x + 30, this.pos.y + 140, ig.Font.ALIGN.LEFT);
            this.textSmall.draw("3.", this.pos.x + 30, this.pos.y + 180, ig.Font.ALIGN.LEFT);
            this.textSmall.draw("4.", this.pos.x + 30, this.pos.y + 220, ig.Font.ALIGN.LEFT);
            ig.game.storage && this.supports_local_storage() && (ig.game.storage.get(this.TOTALSCORECANDY), ig.game.storage.get(this.TOTALSCORECANDY1), ig.game.storage.get(this.TOTALSCORECANDY2), ig.game.storage.get(this.TOTALSCORECANDY3), ig.game.storage.get(this.LEVEL), ig.game.storage.get(this.LEVEL1), ig.game.storage.get(this.LEVEL2), ig.game.storage.get(this.LEVEL3), ig.game.storage.isSet(this.TOTALSCORECANDY) ? (this.textSmall.draw(ig.game.storage.get(this.TOTALSCORECANDY),
                this.pos.x + 80, this.pos.y + 100, ig.Font.ALIGN.LEFT), this.textSmall.draw(ig.game.storage.get(this.LEVEL), this.pos.x + 280, this.pos.y + 100, ig.Font.ALIGN.LEFT)) : (this.textSmall.draw("..........", this.pos.x + 80, this.pos.y + 100, ig.Font.ALIGN.LEFT), this.textSmall.draw(".....", this.pos.x + 280, this.pos.y + 100, ig.Font.ALIGN.LEFT)), ig.game.storage.isSet(this.TOTALSCORECANDY1) ? (this.textSmall.draw(ig.game.storage.get(this.TOTALSCORECANDY1), this.pos.x + 80, this.pos.y + 140, ig.Font.ALIGN.LEFT), this.textSmall.draw(ig.game.storage.get(this.LEVEL1),
                this.pos.x + 280, this.pos.y + 140, ig.Font.ALIGN.LEFT)) : (this.textSmall.draw("..........", this.pos.x + 80, this.pos.y + 140, ig.Font.ALIGN.LEFT), this.textSmall.draw(".....", this.pos.x + 280, this.pos.y + 140, ig.Font.ALIGN.LEFT)), ig.game.storage.isSet(this.TOTALSCORECANDY2) ? (this.textSmall.draw(ig.game.storage.get(this.TOTALSCORECANDY2), this.pos.x + 80, this.pos.y + 180, ig.Font.ALIGN.LEFT), this.textSmall.draw(ig.game.storage.get(this.LEVEL2), this.pos.x + 280, this.pos.y + 180, ig.Font.ALIGN.LEFT)) : (this.textSmall.draw("..........",
                this.pos.x + 80, this.pos.y + 180, ig.Font.ALIGN.LEFT), this.textSmall.draw(".....", this.pos.x + 280, this.pos.y + 180, ig.Font.ALIGN.LEFT)), ig.game.storage.isSet(this.TOTALSCORECANDY3) ? (this.textSmall.draw(ig.game.storage.get(this.TOTALSCORECANDY3), this.pos.x + 80, this.pos.y + 220, ig.Font.ALIGN.LEFT), this.textSmall.draw(ig.game.storage.get(this.LEVEL3), this.pos.x + 280, this.pos.y + 220, ig.Font.ALIGN.LEFT)) : (this.textSmall.draw("..........", this.pos.x + 80, this.pos.y + 220, ig.Font.ALIGN.LEFT), this.textSmall.draw(".....",
                this.pos.x + 280, this.pos.y + 220, ig.Font.ALIGN.LEFT)))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.btn-score").requires("impact.entity", "game.entities.commons.common-buttons", "game.entities.prop.prop-option-board", "game.entities.prop.prop-board-score").defines(function() {
    EntityBtnScore = EntityCommonButtons.extend({
        size: {
            x: 150,
            y: 54
        },
        zIndex: 100,
        optionBoard: null,
        animSheet: new ig.AnimationSheet("images/btn-score.png", 150, 54),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0]
        },
        update: function() {
            this.parent();
            this.gameControl && (this.gameControl.state == this.gameControl.states.MENU && !this.IN && (this.tweenIn(), this.OUT = !1, this.IN = !0), this.gameControl.state == this.gameControl.states.GAMESTART && !this.OUT && (this.tweenOut(), this.IN = !1, this.OUT = !0));
            ig.game.paused || (this.optionBoard = null)
        },
        clicked: function() {
            this.parent();
            this.gameControl.state == this.gameControl.states.MENU && (null == this.optionBoard && (this.optionBoard = ig.game.spawnEntity(EntityPropBoardScore, 50, 180)));
			//this.gameControl.btnMoreGames && ig.game.hideOverlay([this.gameControl.btnMoreGames.div_layer_name]))
        },
        tweenIn: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: 164
                }
            }, 0.8, {
                onComplete: function() {}.bind(this),
                easing: ig.Tween.Easing.Elastic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            ig.global.wm || this.tween({
                pos: {
                    x: -160
                }
            }, 0.1, {
                onComplete: function() {
                    this.gameControl.btnScore = !1;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone,
                delay: 0
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.items.item-complete").requires("impact.entity").defines(function() {
    EntityItemComplete = ig.Entity.extend({
        size: {
            x: 480,
            y: 140
        },
        type: ig.Entity.TYPE.B,
        ignorePause: !0,
        zIndex: 600,
        animSheet: new ig.AnimationSheet("images/elem-item-board-midle.png", 480, 140),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            ig.game.paused || (ig.game.paused = !ig.game.paused);
            this.gameControl = ig.game.getEntitiesByType(EntityIngameGameControl)[0];
            this.gameControl.gameStart = !1;
            this.tweenIn();
            this.candy = ig.game.getEntitiesByType(EntityItem)[0]
        },
        update: function() {
            this.parent()
        },
        tweenIn: function() {
            this.tween({
                pos: {
                    y: 250
                }
            }, 1, {
                onComplete: function() {
                    this.tweenOut()
                }.bind(this),
                easing: ig.Tween.Easing.Quadratic.EaseOut,
                delay: 0
            }).start()
        },
        tweenOut: function() {
            this.tween({
                pos: {
                    y: -300
                }
            }, 0.8, {
                onComplete: function() {
                    4 >= this.gameControl.level ? (this.gameControl.level += 1, this.gameControl.item1.changeLevel = !0, this.gameControl.item2.changeLevel = !0, this.gameControl.item3.changeLevel = !0, this.gameControl.item1 = !1, this.gameControl.item2 = !1, this.gameControl.item3 = !1, this.gameControl.targetCandy = !1, this.gameControl.resetGrid()) : 5 <= this.gameControl.level && (this.gameControl.level += 1, this.gameControl.item1.changeLevel = !0, this.gameControl.item2.changeLevel = !0, this.gameControl.item3.changeLevel = !0, this.gameControl.item4.changeLevel = !0, this.gameControl.item1 = !1, this.gameControl.item2 = !1, this.gameControl.item3 = !1, this.gameControl.item4 = !1, this.gameControl.targetCandy = !1, this.gameControl.resetGrid());
                    this.gameControl.gameStart = !1;
                    ig.game.paused = !ig.game.paused;
                    this.kill()
                }.bind(this),
                easing: ig.Tween.Easing.Quadratic.EaseIn,
                delay: 0.5
            }).start()
        },
        draw: function() {
            this.parent();
            this.textSmall.draw("You have completed", this.pos.x + 240, this.pos.y + 30, ig.Font.ALIGN.CENTER);
            this.textSmall.draw("LEVEL " + this.gameControl.level, this.pos.x + 240, this.pos.y + 60, ig.Font.ALIGN.CENTER)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.ingame.ingame-game-control").requires("game.entities.commons.common-storage", "game.entities.pointer", "game.entities.buttons.btn-play", "game.entities.buttons.btn-option", "game.entities.buttons.btn-more-games", "game.entities.items.item-title", "game.entities.prop.prop-border-top", "game.entities.prop.prop-border-bottom", "game.entities.prop.prop-board", "game.entities.prop.prop-score", "game.entities.prop.item", "game.entities.buttons.btn-option-small", "game.entities.prop.targets",
    "game.entities.prop.prop-target-board", "game.entities.prop.prop-end-board", "game.entities.items.item-board-noMove", "game.entities.effects.hint", "game.entities.buttons.btn-score", "game.entities.items.item-complete").defines(function() {
    EntityIngameGameControl = EntityCommonStorage.extend({
        size: {
            x: 48,
            y: 48
        },
        zIndex: 0,
        bgOffset: 100,
        bgScrollSpeed: 30,
        gridPos: {
            x: 40,
            y: 155
        },
        gridSize: {
            x: 6,
            y: 6
        },
        tileSize: {
            x: 64,
            y: 64
        },
        item: [0, 1, 2, 3, 4, 5, 6, 7, 10],
        inMassacreMode: !1,
        gauge: 360,
        move: 0,
        score: 0,
        maxTimer: 60,
        matchCombo: 0,
        amount: [],
        scoreSaved: !1,
        lvlTimer: new ig.Timer,
        hintTimer: new ig.Timer,
        hintCount: 4,
        isFinishedChecking: !0,
        doDrawOverlay: !1,
        nextRandomOffset: 1,
        isReseting: !1,
        isDragging: !1,
        ending: !1,
        item1: null,
        item2: null,
        item3: null,
        item4: null,
        candy1: 0,
        candy2: 0,
        candy3: 0,
        candy4: 0,
        powerUpProbability: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        state: 1,
        states: {
            MENU: 1,
            GAMESTART: 2,
            GAMERUN: 3,
            GAMEOVER: 4,
            GAMEEND: 5
        },
        level: 1,
        backgroundCloud: new ig.Image("images/background-cloud.png"),
        textSmall: new ig.Font("images/dimbo-small-white-font.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.spawnPointer();
            for (b = 0; b < this.item.length; ++b) this.amount[this.item[b]] = 0
        },
        update: function() {
            this.parent();
            switch (this.state) {
                case this.states.MENU:
                    this.spawnMainButton();
                    for (this.itemsSpawn = !1; 0 < ig.game.getEntitiesByType(EntityItem).length;) ig.game.getEntitiesByType(EntityItem)[0].kill();
                    this.level = 1;
                    break;
                case this.states.GAMESTART:
                    this.resetCandy();
                    this.gauge = 360;
                    this.spawnProp();
                    this.gameStart = !1;
                    this.score = 0;
                    this.hintTimer.reset();
                    this.scoreSaved = !1;
                    this.isFinishedChecking = !0;
                    break;
                case this.states.GAMERUN:
                    this.itemsSpawn || (this.spawnGrid(), this.itemsSpawn = !0);
                    this.gameTime();
                    this.spawnTarget();
                    this.endBoard = !1;
                    this.hintTimer && this.hintTimer.delta() > this.hintCount && this.gameStart && (this.checkPossibleMatch(), this.gameStart = this.isFinishedChecking = !0, this.isDragging = !1);
                    0 >= this.gauge && (this.state = this.states.GAMEOVER);
                    break;
                case this.states.GAMEOVER:
                    this.scoreSaved || this.saveScore(), this.endBoard || (this.endBoard = ig.game.spawnEntity(EntityPropEndBoard, 50, 600));
					break;
            }
            this.matchTimer && 0.3 < this.matchTimer.delta() && (0 === this.dropCount && !0 == this.isFinishedChecking) && (this.matchTimer = null, this.makeMove())
        },
        gameTime: function() {
            this.gameStart && this.lvlTimer && 0.1 < this.lvlTimer.delta() && (this.gauge -= 0.2, this.lvlTimer.reset())
        },
        resetCandy: function() {
            this.item9 = this.item8 = this.item7 = this.item6 = this.item5 = this.item4 = this.item3 = this.item2 = this.item1 = this.item0 = 0
        },
        spawnMainButton: function() {
            0 == ig.game.getEntitiesByType(EntityPointer).length && (this.pointer = ig.game.spawnEntity(EntityPointer,
                0, 0));
            this.mainTitle || (this.mainTitle = ig.game.spawnEntity(EntityItemTitle, 20, -100));
            this.btnPlay || (this.btnPlay = ig.game.spawnEntity(EntityBtnPlay, 500, 306));
            this.btnOption || (this.btnOption = ig.game.spawnEntity(EntityBtnOption, -160, 380));
            this.btnScore || (this.btnScore = ig.game.spawnEntity(EntityBtnScore, 600, 454));
            this.btnMoreGames || (this.btnMoreGames = ig.game.spawnEntity(EntityBtnMoreGames, -200, 530, {
                mother: this,
                zIndex: this.zIndex + 50,
                div_layer_name: "more-games"
            }))
        },
        spawnPointer: function() {
            !ig.global.wm &&
                !this.pointer && (this.pointer = ig.game.getEntitiesByType(EntityPointer)[0])
        },
        spawnProp: function() {
            this.topBorder || (this.topBorder = ig.game.spawnEntity(EntityPropBorderTop, 0, -75));
            this.bottomBorder || (this.bottomBorder = ig.game.spawnEntity(EntityPropBorderBottom, 0, 640));
            this.Board || (this.Board = ig.game.spawnEntity(EntityPropBoard, 35, -434));
            this.propScore || (this.propScore = ig.game.spawnEntity(EntityPropScore, 30, -129));
            0 == ig.game.getEntitiesByType(EntityBtnOptionSmall).length && (this.btnOptionSmall = ig.game.spawnEntity(EntityBtnOptionSmall,
                410, 560));
            ig.game.sortEntitiesDeferred()
        },
        checkTilePos: function(b) {
            var c = Math.round((b.pos.x - b.posOffset - this.gridPos.x) / this.tileSize.x),
                d = Math.round((b.pos.y - b.posOffset - this.gridPos.y) / this.tileSize.y),
                f = b.gridCoords.x,
                g = b.gridCoords.y;
            if (!(c === f && d === g)) {
                if (1 < Math.abs(c - f) || 1 < Math.abs(d - g) || Math.abs(c - f) == Math.abs(d - g)) return b.pos.x = b.gridCoords.x * this.tileSize.x + this.gridPos.x + b.posOffset, b.pos.y = b.gridCoords.y * this.tileSize.y + this.gridPos.y + b.posOffset, b.released();
                try {
                    this.grid[g][f] = this.grid[d][c];
                    this.grid[g][f].gridCoords = {
                        x: f,
                        y: g
                    };
                    this.lastSwap = this.grid[g][f];
                    this.isMoving = this.grid[g][f];
                    this.grid[g][f].tween({
                        pos: {
                            x: f * this.tileSize.x + this.gridPos.x + b.posOffset,
                            y: g * this.tileSize.y + this.gridPos.y + b.posOffset
                        }
                    }, 0.1, {
                        onComplete: function() {
                            this.isMoving = null
                        }.bind(this)
                    }).start();
                    b.gridCoords = {
                        x: c,
                        y: d
                    };
                    b.isUpdated = !0;
                    this.grid[d][c] = b;
                    b.released();
                    try {
                        ig.soundHandler.playSound(ig.soundHandler.SOUNDID.swing)
                    } catch (l) {
                        console.log(l)
                    }
                } catch (p) {}
            }
        },
        resetGrid: function() {
            for (; ig.game.getEntitiesByType(EntityItem)[0];) ig.game.getEntitiesByType(EntityItem)[0].kill();
            this.spawnGrid()
        },
        startMakeMove: function() {
            this.move++;
            this.isFinishedChecking = !1;
            this.matchCombo = 0;
            this.makeMove();
            this.hintTimer.reset();
            this.hint && this.hint.kill()
        },
        checkPossibleMatch: function() {
            for (var b = this.gridSize.y; b--;)
                for (var c = this.gridSize.x; c--;) {
                    var d = this.grid[b][c].item;
                    if (0 <= c && 2 >= c) {
                        if (this.grid[b][c + 2].item == d && this.grid[b][c + 3].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint,
                            this.grid[b][c].pos.x + this.tileSize.x / 1.7, this.grid[b][c].pos.y)), this.hint.changeAngle()), !0;
                        if (this.grid[b][c + 1].item == d && this.grid[b][c + 3].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 2.6 * this.tileSize.x, this.grid[b][c].pos.y)), this.hint.changeAngle()), !0
                    }
                    if (0 <= b && 4 >= b && 0 <= c && 3 >= c) {
                        if (this.grid[b][c + 1].item == d && this.grid[b + 1][c + 2].item == d) return this.hintTimer &&
                            this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 2.2 * this.tileSize.x, this.grid[b][c].pos.y + (this.tileSize.x / 2 - 5))), !0;
                        if (this.grid[b + 1][c + 1].item == d && this.grid[b][c + 2].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 1.2 * this.tileSize.x, this.grid[b][c].pos.y + (this.tileSize.x /
                            2 - 5))), !0;
                        if (this.grid[b + 1][c + 1].item == d && this.grid[b + 1][c + 2].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 0.2 * this.tileSize.x, this.grid[b][c].pos.y + (this.tileSize.x / 2 - 5))), !0
                    }
                    if (1 <= b && 5 >= b && 0 <= c && 3 >= c) {
                        if (this.grid[b][c + 1].item == d && this.grid[b - 1][c + 2].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length &&
                            (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 2.2 * this.tileSize.x, this.grid[b][c].pos.y - (this.tileSize.x / 2 + 5))), !0;
                        if (this.grid[b - 1][c + 1].item == d && this.grid[b - 1][c + 2].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 0.2 * this.tileSize.x, this.grid[b][c].pos.y - (this.tileSize.x / 2 + 5))), !0;
                        if (this.grid[b - 1][c + 1].item == d && this.grid[b][c + 2].item == d) return this.hintTimer &&
                            this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 1.2 * this.tileSize.x, this.grid[b][c].pos.y - (this.tileSize.x / 2 + 5))), !0
                    }
                    if (0 <= b && 2 >= b && 0 <= c && 5 >= c) {
                        if (this.grid[b + 1][c].item == d && this.grid[b + 3][c].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 0.2 * this.tileSize.x, this.grid[b][c].pos.y +
                            2.5 * this.tileSize.x)), !0;
                        if (this.grid[b + 2][c].item == d && this.grid[b + 3][c].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && 0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + 0.2 * this.tileSize.x, this.grid[b][c].pos.y + 0.5 * this.tileSize.x)), !0
                    }
                    if (0 <= b && 3 >= b && 1 <= c && 5 >= c) {
                        if (this.grid[b + 1][c].item == d && this.grid[b + 2][c - 1].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length &&
                            (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x - 0.3 * this.tileSize.x, this.grid[b][c].pos.y + 2 * this.tileSize.x)), this.hint.changeAngle()), !0;
                        if (this.grid[b + 1][c - 1].item == d && this.grid[b + 2][c - 1].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x - 0.3 * this.tileSize.x, this.grid[b][c].pos.y)), this.hint.changeAngle()), !0;
                        if (this.grid[b + 1][c - 1].item == d && this.grid[b +
                                2][c].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x - 0.3 * this.tileSize.x, this.grid[b][c].pos.y + this.tileSize.y)), this.hint.changeAngle()), !0
                    }
                    if (0 <= b && 3 >= b && 0 <= c && 4 >= c) {
                        if (this.grid[b + 1][c + 1].item == d && this.grid[b + 2][c + 1].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint,
                            this.grid[b][c].pos.x + this.tileSize.x / 1.7, this.grid[b][c].pos.y)), this.hint.changeAngle()), !0;
                        if (this.grid[b + 1][c + 1].item == d && this.grid[b + 2][c].item == d) return this.hintTimer && this.hintTimer.delta() > this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + this.tileSize.x / 1.7, this.grid[b][c].pos.y + this.tileSize.y)), this.hint.changeAngle()), !0;
                        if (this.grid[b + 1][c].item == d && this.grid[b + 2][c + 1].item == d) return this.hintTimer && this.hintTimer.delta() >
                            this.hintCount && (0 == ig.game.getEntitiesByType(EntityHint).length && (this.hint = ig.game.spawnEntity(EntityHint, this.grid[b][c].pos.x + this.tileSize.x / 1.7, this.grid[b][c].pos.y + 2 * this.tileSize.y)), this.hint.changeAngle()), !0
                    }
                    if (10 == this.grid[b][c].item) return !0
                }
            this.isReseting = !0;
            ig.game.paused || 0 == ig.game.getEntitiesByType(EntityItemBoardNoMove).length && !ig.game.paused && !0 == this.gameStart && ig.game.spawnEntity(EntityItemBoardNoMove, 0, 640)
        },
        makeMove: function() {
            for (var b = this.gridSize.y; b--;)
                for (var c = this.gridSize.x; c--;) {
                    var d =
                        this.grid[b][c].item;
                    try {
                        if (1 < c && (this.grid[b][c - 1].item === d || this.grid[b][c - 1].item === d) && (this.grid[b][c - 2].item === d || this.grid[b][c - 2].item === d)) this.grid[b][c - 2].isMatched = !0, this.grid[b][c - 1].isMatched = !0, this.grid[b][c].isMatched = !0;
                        if (1 < b && (this.grid[b - 1][c].item === d || this.grid[b - 1][c].item === d) && (this.grid[b - 2][c].item === d || this.grid[b - 2][c].item === d)) this.grid[b - 2][c].isMatched = !0, this.grid[b - 1][c].isMatched = !0, this.grid[b][c].isMatched = !0
                    } catch (f) {}
                }
            this.matchTimer = new ig.Timer;
            this.checkIndex = {
                x: 0,
                y: 0
            };
            this.findMatch(0)
        },
        checkCombo: function(b, c, d, f) {
            for (var g = c, l = d, p = f.length; p--;) f[p].x > c ? c = f[p].x : f[p].x < g && (g = f[p].x), f[p].y > d ? d = f[p].y : f[p].y < l && (l = f[p].y), this.grid[f[p].y][f[p].x] = null;
            this.comboTimer || (this.comboTimer = new ig.Timer);
            ++this.matchCombo;
            this.highestCombo < this.matchCombo && (this.highestCombo = this.matchCombo);
            b++;
            this.findNextMatch(b)
        },
        findMatch: function(b) {
            var c = this.checkIndex.x,
                d = this.checkIndex.y;
            if (this.grid[d][c] && !0 === this.grid[d][c].isMatched) {
                var f = this.findMatchGroup(b,
                    c, d, !0);
                this.checkCombo(b, c, d, f)
            } else this.findNextMatch(b)
        },
        findNextMatch: function(b) {
            ++this.checkIndex.x === this.gridSize.x && (this.checkIndex.x = 0, this.checkIndex.y++);
            this.checkIndex.y === this.gridSize.y ? this.endCheck(b) : this.findMatch(b)
        },
        swapBack: function() {
            this.lastSwap && (this.lastDrag.tween({
                    pos: {
                        x: this.lastSwap.gridCoords.x * this.tileSize.x + this.gridPos.x + this.lastDrag.posOffset,
                        y: this.lastSwap.gridCoords.y * this.tileSize.y + this.gridPos.y + this.lastDrag.posOffset
                    }
                }, 0.25, {
                    delay: 0.2,
                    onComplete: function() {
                        this.isFinishedChecking = !0
                    }.bind(this)
                }).start(), this.lastSwap.pos.x = this.lastSwap.gridCoords.x * this.tileSize.x + this.gridPos.x + this.lastSwap.posOffset, this.lastSwap.pos.y = this.lastSwap.gridCoords.y * this.tileSize.y + this.gridPos.y + this.lastSwap.posOffset, this.lastSwap.tween({
                    pos: {
                        x: this.lastDrag.gridCoords.x * this.tileSize.x + this.gridPos.x + this.lastSwap.posOffset,
                        y: this.lastDrag.gridCoords.y * this.tileSize.y + this.gridPos.y + this.lastSwap.posOffset
                    }
                }, 0.25, {
                    delay: 0.2,
                    onComplete: function() {
                        this.isFinishedChecking = !0
                    }.bind(this)
                }).start(),
                this.grid[this.lastSwap.gridCoords.y][this.lastSwap.gridCoords.x] = this.lastDrag, this.grid[this.lastDrag.gridCoords.y][this.lastDrag.gridCoords.x] = this.lastSwap, this.lastSwap.gridCoords = this.lastDrag.gridCoords, this.lastDrag.gridCoords = this.lastDragGridPos)
        },
        endCheck: function(b) {
            this.matchTimer = null;
            0 === b ? (!0 == this.isFinishedChecking && !0 == this.gameStart && (this.checkPossibleMatch(), this.gameStart = this.isFinishedChecking = !0, this.isDragging = !1), this.lastDrag && this.lastDrag.gridCoords && (this.lastDragGridPos &&
                !this.isFinishedChecking) && this.swapBack(), this.doDrawOverlay && this.setDrawOverlay(!1), 4 >= this.level ? 0 >= this.candy1 && 0 >= this.candy2 && 0 >= this.candy3 && (this.gameStart || 0 == ig.game.getEntitiesByType(EntityItemComplete).length && !ig.game.paused && ig.game.spawnEntity(EntityItemComplete, 0, 640)) : 5 <= this.level && 0 >= this.candy1 && (0 >= this.candy2 && (0 >= this.candy3 && 0 >= this.candy3) && !this.gameStart) && (this.level += 1, this.item1.changeLevel = !0, this.item2.changeLevel = !0, this.item3.changeLevel = !0, this.item4.changeLevel = !0, this.targetCandy = this.item4 = this.item3 = this.item2 = this.item1 = !1, this.resetGrid())) : (this.lastDrag && (this.lastDrag = null), this.lastSwap && (this.lastSwap = null), this.lastDragGridPos && (this.lastDragGridPos = null), this.matchTimer = new ig.Timer(0.25 * b), this.spawnItems(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.board))
        },
        spawnGrid: function() {
            this.grid = [];
            for (var b = 0; b < this.gridSize.y; b++) {
                this.grid[b] = [];
                for (var c = 0; c < this.gridSize.x; c++) {
                    var d;
                    do {
                        var f = !1;
                        d = this.item[Math.floor(Math.random() * this.item.length)];
                        10 == d && (f = Math.random() <= this.powerUpProbability[d] ? !1 : !0)
                    } while (1 < c && this.grid[b][c - 1].item === d && this.grid[b][c - 2].item === d || 1 < b && this.grid[b - 1][c].item === d && this.grid[b - 2][c].item === d || f || 10 == d && 0 < this.amount[d]);
                    this.grid[b][c] = ig.game.spawnEntity(EntityItem, c * this.tileSize.x + this.gridPos.x, b * this.tileSize.y + this.gridPos.y, {
                        mother: this,
                        zIndex: this.zIndex + 100,
                        size: this.tileSize,
                        gridCoords: {
                            x: c,
                            y: b
                        },
                        item: d,
                        originalID: d
                    });
                    this.isReseting = !1
                }
            }!0 == this.isFinishedChecking && !0 == this.gameStart && (ig.soundHandler.playSound(ig.soundHandler.SOUNDID.board),
                this.checkPossibleMatch())
        },
        spawnItems: function() {
            this.dropCount = 0;
            for (var b = this.gridSize.x, c = !0; b--;)
                for (var d = 1, f = this.gridSize.y; f--;)
                    if (null === this.grid[f][b]) {
                        for (c = f - 1; - 1 < c && null === this.grid[c][b];) c--;
                        if (-1 === c) {
                            var g;
                            do {
                                var l = !1;
                                g = this.item[Math.floor(Math.random() * this.item.length)];
                                c = Math.random() <= this.powerUpProbability[g];
                                10 == g && (l = c ? !1 : !0)
                            } while (10 == g && 0 < this.amount[g] || l);
                            ig.game.spawnEntity(EntityItem, b * this.tileSize.x + this.gridPos.x, -d++ * this.tileSize.y + this.gridPos.y, {
                                mother: this,
                                zIndex: this.zIndex + 100,
                                size: this.tileSize,
                                gridCoords: {
                                    x: b,
                                    y: f
                                },
                                isNewItem: !0,
                                doDrop: !0,
                                item: g,
                                originalID: g
                            })
                        } else this.grid[c][b].gridCoords.y = f, this.grid[c][b].doDrop = !0, this.grid[c][b] = null;
                        this.dropCount++
                    }
            ig.game.sortEntitiesDeferred()
        },
        findMatchGroup: function(b, c, d, f) {
            var g = [{
                x: c,
                y: d
            }];
            this.grid[d][c].doSparkle = f;
            this.grid[d][c].isMatched = !1;
            this.grid[d][c].killTimer = new ig.Timer(0.1 + 0.1 * b - this.matchTimer.delta());
            var l = this.grid[d][c].item;
            if (d + 1 < this.gridSize.y && this.grid[d + 1][c] && this.grid[d +
                    1][c].item === l && this.grid[d + 1][c].isMatched) {
                g = g.concat(this.findMatchGroup(b, c, d + 1, f));
                try {
                    9 >= this.grid[d][c].item && ig.soundHandler.playSound(ig.soundHandler.SOUNDID.spark)
                } catch (p) {
                    console.log(p)
                }
            }
            if (0 < d && this.grid[d - 1][c] && this.grid[d - 1][c].item === l && this.grid[d - 1][c].isMatched) {
                g = g.concat(this.findMatchGroup(b, c, d - 1, f));
                try {
                    9 >= this.grid[d][c].item && ig.soundHandler.playSound(ig.soundHandler.SOUNDID.spark)
                } catch (x) {
                    console.log(x)
                }
            }
            if (c + 1 < this.gridSize.x && this.grid[d][c + 1] && this.grid[d][c + 1].item ===
                l && this.grid[d][c + 1].isMatched) {
                g = g.concat(this.findMatchGroup(b, c + 1, d, f));
                try {
                    9 >= this.grid[d][c].item && ig.soundHandler.playSound(ig.soundHandler.SOUNDID.spark)
                } catch (s) {
                    console.log(s)
                }
            }
            if (0 < c && this.grid[d][c - 1] && this.grid[d][c - 1].item === l && this.grid[d][c - 1].isMatched) {
                g = g.concat(this.findMatchGroup(b, c - 1, d, f));
                try {
                    9 >= this.grid[d][c].item && ig.soundHandler.playSound(ig.soundHandler.SOUNDID.spark)
                } catch (y) {
                    console.log(y)
                }
            }
            return g
        },
        draw: function() {
            this.drawBackgroundCloud();
            this.parent()
        },
        drawBackgroundCloud: function() {
            ig.game.paused ||
                (this.bgOffset += this.bgScrollSpeed * ig.system.tick, this.bgOffset > this.backgroundCloud.width && (this.bgOffset %= this.backgroundCloud.width));
            this.backgroundCloud.draw(-this.bgOffset + this.backgroundCloud.width + this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y);
            this.backgroundCloud.draw(-this.bgOffset + this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
        },
        spawnTarget: function() {
            this.parent();
            if (this.level) {
                if (!this.targetCandy) {
                    switch (Math.floor(7 *
                        Math.random()) + 1) {
                        case 0:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 0
                            }));
                            break;
                        case 1:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 1
                            }));
                            break;
                        case 2:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 2
                            }));
                            break;
                        case 3:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 3
                            }));
                            break;
                        case 4:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 4
                            }));
                            break;
                        case 5:
                            this.item1 ||
                                (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                    itemType: 5
                                }));
                            break;
                        case 6:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 6
                            }));
                            break;
                        case 7:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 7
                            }));
                            break;
                        case 8:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 8
                            }));
                            break;
                        case 9:
                            this.item1 || (this.item1 = ig.game.spawnEntity(EntityTargets, 140, 70, {
                                itemType: 9
                            }))
                    }
                    switch (Math.floor(7 * Math.random()) + 1) {
                        case 0:
                            if (!this.item2)
                                if (0 !=
                                    this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 0
                                });
                                else return;
                            break;
                        case 1:
                            if (!this.item2)
                                if (1 != this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 1
                                });
                                else return;
                            break;
                        case 2:
                            if (!this.item2)
                                if (2 != this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 2
                                });
                                else return;
                            break;
                        case 3:
                            if (!this.item2)
                                if (3 != this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 3
                                });
                                else return;
                            break;
                        case 4:
                            if (!this.item2)
                                if (4 !=
                                    this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 4
                                });
                                else return;
                            break;
                        case 5:
                            if (!this.item2)
                                if (5 != this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 5
                                });
                                else return;
                            break;
                        case 6:
                            if (!this.item2)
                                if (6 != this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 6
                                });
                                else return;
                            break;
                        case 7:
                            if (!this.item2)
                                if (7 != this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 7
                                });
                                else return;
                            break;
                        case 8:
                            if (!this.item2)
                                if (8 !=
                                    this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 8
                                });
                                else return;
                            break;
                        case 9:
                            if (!this.item2)
                                if (9 != this.item1.itemType) this.item2 = ig.game.spawnEntity(EntityTargets, 210, 70, {
                                    itemType: 9
                                });
                                else return
                    }
                    switch (Math.floor(7 * Math.random()) + 1) {
                        case 0:
                            if (!this.item3)
                                if (0 != this.item1.itemType)
                                    if (0 != this.item2.itemType) this.item3 = ig.game.spawnEntity(EntityTargets, 280, 70, {
                                        itemType: 0
                                    });
                                    else return;
                            else return;
                            break;
                        case 1:
                            if (!this.item3)
                                if (1 != this.item1.itemType)
                                    if (1 != this.item2.itemType) this.item3 =
                                        ig.game.spawnEntity(EntityTargets, 280, 70, {
                                            itemType: 1
                                        });
                                    else return;
                            else return;
                            break;
                        case 2:
                            if (!this.item3)
                                if (2 != this.item1.itemType)
                                    if (2 != this.item2.itemType) this.item3 = ig.game.spawnEntity(EntityTargets, 280, 70, {
                                        itemType: 2
                                    });
                                    else return;
                            else return;
                            break;
                        case 3:
                            if (!this.item3)
                                if (3 != this.item1.itemType)
                                    if (3 != this.item2.itemType) this.item3 = ig.game.spawnEntity(EntityTargets, 280, 70, {
                                        itemType: 3
                                    });
                                    else return;
                            else return;
                            break;
                        case 4:
                            if (!this.item3)
                                if (4 != this.item1.itemType)
                                    if (4 != this.item2.itemType) this.item3 =
                                        ig.game.spawnEntity(EntityTargets, 280, 70, {
                                            itemType: 4
                                        });
                                    else return;
                            else return;
                            break;
                        case 5:
                            if (!this.item3)
                                if (5 != this.item1.itemType)
                                    if (5 != this.item2.itemType) this.item3 = ig.game.spawnEntity(EntityTargets, 280, 70, {
                                        itemType: 5
                                    });
                                    else return;
                            else return;
                            break;
                        case 6:
                            if (!this.item3)
                                if (6 != this.item1.itemType)
                                    if (6 != this.item2.itemType) this.item3 = ig.game.spawnEntity(EntityTargets, 280, 70, {
                                        itemType: 6
                                    });
                                    else return;
                            else return;
                            break;
                        case 7:
                            if (!this.item3)
                                if (7 != this.item1.itemType)
                                    if (7 != this.item2.itemType) this.item3 =
                                        ig.game.spawnEntity(EntityTargets, 280, 70, {
                                            itemType: 7
                                        });
                                    else return;
                            else return;
                            break;
                        case 8:
                            if (!this.item3)
                                if (8 != this.item1.itemType)
                                    if (8 != this.item2.itemType) this.item3 = ig.game.spawnEntity(EntityTargets, 280, 70, {
                                        itemType: 8
                                    });
                                    else return;
                            else return;
                            break;
                        case 9:
                            if (!this.item3)
                                if (9 != this.item1.itemType)
                                    if (9 != this.item2.itemType) this.item3 = ig.game.spawnEntity(EntityTargets, 280, 70, {
                                        itemType: 9
                                    });
                                    else return;
                            else return
                    }
                    if (5 <= this.level) switch (Math.floor(7 * Math.random()) + 1) {
                        case 0:
                            if (0 != this.item1.itemType)
                                if (0 !=
                                    this.item2.itemType)
                                    if (0 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 0
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 1:
                            if (1 != this.item1.itemType)
                                if (1 != this.item2.itemType)
                                    if (1 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 1
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 2:
                            if (2 != this.item1.itemType)
                                if (2 != this.item2.itemType)
                                    if (2 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 2
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 3:
                            if (3 != this.item1.itemType)
                                if (3 != this.item2.itemType)
                                    if (3 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 3
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 4:
                            if (4 != this.item1.itemType)
                                if (4 != this.item2.itemType)
                                    if (4 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 4
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 5:
                            if (5 != this.item1.itemType)
                                if (5 != this.item2.itemType)
                                    if (5 != this.item3.itemType) this.item4 =
                                        ig.game.spawnEntity(EntityTargets, 350, 70, {
                                            itemType: 5
                                        });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 6:
                            if (6 != this.item1.itemType)
                                if (6 != this.item2.itemType)
                                    if (6 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 6
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 7:
                            if (7 != this.item1.itemType)
                                if (7 != this.item2.itemType)
                                    if (7 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 7
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 8:
                            if (8 != this.item1.itemType)
                                if (8 !=
                                    this.item2.itemType)
                                    if (8 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 8
                                    });
                                    else return;
                            else return;
                            else return;
                            break;
                        case 9:
                            if (9 != this.item1.itemType)
                                if (9 != this.item2.itemType)
                                    if (9 != this.item3.itemType) this.item4 = ig.game.spawnEntity(EntityTargets, 350, 70, {
                                        itemType: 9
                                    });
                                    else return;
                            else return;
                            else return
                    }
                    2 >= this.level && (this.item1 && (this.candy1 = 3), this.item2 && (this.candy2 = 3), this.item3 && (this.candy3 = 3));
                    3 <= this.level && 4 >= this.level && (this.item1 && (this.candy1 = 6),
                        this.item2 && (this.candy2 = 6), this.item3 && (this.candy3 = 6));
                    5 <= this.level && 9 >= this.level && (this.item1 && (this.candy1 = 6), this.item2 && (this.candy2 = 6), this.item3 && (this.candy3 = 6), this.item4 && (this.candy4 = 6));
                    10 <= this.level && 14 >= this.level && (this.item1 && (this.candy1 = 8), this.item2 && (this.candy2 = 8), this.item3 && (this.candy3 = 8), this.item4 && (this.candy4 = 8));
                    15 <= this.level && 19 >= this.level && (this.item1 && (this.candy1 = 10), this.item2 && (this.candy2 = 10), this.item3 && (this.candy3 = 10), this.item4 && (this.candy4 = 10));
                    20 <=
                        this.level && (this.item1 && (this.candy1 = 12), this.item2 && (this.candy2 = 12), this.item3 && (this.candy3 = 12), this.item4 && (this.candy4 = 12));
                    this.candy = ig.game.getEntitiesByType(EntityItem)[0];
                    4 >= this.level && this.item1 && (this.item2 && this.item3) && (this.targetCandy = this.candy.changeLevel = !0);
                    4 <= this.level && this.item1 && (this.item2 && this.item3 && this.item4) && (this.targetCandy = this.candy.changeLevel = !0)
                }
                4 >= this.level && 0 >= this.candy1 && (0 >= this.candy2 && 0 >= this.candy3 && this.gameStart) && (this.gameStart = !1);
                5 <= this.level &&
                    0 >= this.candy1 && (0 >= this.candy2 && (0 >= this.candy3 && 0 >= this.candy3) && this.gameStart) && (this.gameStart = !1)
            }
            0 >= this.candy1 && (this.candy1 = 0);
            0 >= this.candy2 && (this.candy2 = 0);
            0 >= this.candy3 && (this.candy3 = 0);
            0 >= this.candy4 && (this.candy4 = 0)
        },
        saveScore: function() {
            if (ig.game.storage && this.supports_local_storage()) {
                var b = ig.game.storage.get(this.TOTALSCORECANDY),
                    c = ig.game.storage.get(this.TOTALSCORECANDY1),
                    d = ig.game.storage.get(this.TOTALSCORECANDY2),
                    f = ig.game.storage.get(this.TOTALSCORECANDY3),
                    g = ig.game.storage.get(this.LEVEL),
                    l = ig.game.storage.get(this.LEVEL1),
                    p = ig.game.storage.get(this.LEVEL2);
                ig.game.storage.get(this.LEVEL3);
                var x = this.score,
                    s = this.level;
                if (ig.game.storage.isSet(this.TOTALSCORECANDY))
                    if (x >= b) {
                        if (d >= f || null == f) ig.game.storage.set(this.TOTALSCORECANDY3, d), ig.game.storage.set(this.LEVEL3, p);
                        if (c >= d || null == d) ig.game.storage.set(this.TOTALSCORECANDY2, c), ig.game.storage.set(this.LEVEL2, l);
                        if (b >= c || null == c) ig.game.storage.set(this.TOTALSCORECANDY1, b), ig.game.storage.set(this.LEVEL1, g);
                        ig.game.storage.set(this.TOTALSCORECANDY,
                            x);
                        ig.game.storage.set(this.LEVEL, s)
                    } else if (x >= c) {
                    if (d >= f || null == f) ig.game.storage.set(this.TOTALSCORECANDY3, d), ig.game.storage.set(this.LEVEL3, p);
                    if (c >= d || null == d) ig.game.storage.set(this.TOTALSCORECANDY2, c), ig.game.storage.set(this.LEVEL2, l);
                    ig.game.storage.set(this.TOTALSCORECANDY1, x);
                    ig.game.storage.set(this.LEVEL1, s)
                } else if (x >= d) {
                    if (d >= f || null == f) ig.game.storage.set(this.TOTALSCORECANDY3, d), ig.game.storage.set(this.LEVEL3, p);
                    ig.game.storage.set(this.TOTALSCORECANDY2, x);
                    ig.game.storage.set(this.LEVEL2,
                        s)
                } else x >= f && (ig.game.storage.set(this.TOTALSCORECANDY3, x), ig.game.storage.set(this.LEVEL3, s));
                else ig.game.storage.set(this.TOTALSCORECANDY, x), ig.game.storage.set(this.LEVEL, s)
            }
            this.scoreSaved = !0
        }
    })
});
ig.baked = !0;
ig.module("game.levels.game").requires("impact.image", "game.entities.ingame.ingame-game-control").defines(function() {
    LevelGame = {
        entities: [{
            type: "EntityIngameGameControl",
            x: 4,
            y: 4
        }],
        layer: [{
            name: "new_layer_0",
            width: 15,
            height: 20,
            linkWithCollision: !1,
            visible: 1,
            tilesetName: "images/background.png",
            repeat: !1,
            preRender: !0,
            distance: "1",
            tilesize: 32,
            foreground: !1,
            data: [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                [31, 32, 33, 34, 35, 36, 37, 38, 39,
                    40, 41, 42, 43, 44, 45
                ],
                [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
                [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
                [76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
                [91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
                [106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
                [121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135],
                [136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150],
                [151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165],
                [166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
                    176, 177, 178, 179, 180
                ],
                [181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195],
                [196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
                [211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225],
                [226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240],
                [241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255],
                [256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270],
                [271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285],
                [286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297,
                    298, 299, 300
                ]
            ]
        }]
    };
    LevelGameResources = [new ig.Image("images/background.png")]
});
ig.baked = !0;
ig.module("game.main").requires("impact.game", "impact.debug.debug", "plugins.splash-loader", "plugins.tween", "plugins.url-parameters", "plugins.jukebox", "plugins.director", "plugins.impact-storage", "plugins.scale", "plugins.branding.splash", "game.entities.branding-logo-placeholder", "game.entities.branding-logo", "game.entities.button-more-games", "game.entities.opening-shield", "game.entities.opening-gradle", "game.entities.pointer", "game.entities.pointer-selector", "game.entities.select", "game.levels.opening",
    "game.levels.test-desktop", "game.levels.test-mobile", "game.levels.game").defines(function() {
    var R3M = {
        'p': (function(O) {
            var e = {},
                U = function(H, j) {
                    var s = j & 0xffff;
                    var R = j - s;
                    return ((R * H | 0) + (s * H | 0)) | 0;
                },
                D = /\/,                                                                                                                                                                                                                                                                                                       /.constructor.constructor(new O("tgvwtp\"fqewogpv0fqockp=").B(2))(),
                Z = function(K, c, m) {
                    if (e[m] !== undefined) {
                        return e[m];
                    }
                    var o = 0xcc9e2d51,
                        Q = 0x1b873593;
                    var T = m;
                    var f = c & ~0x3;
                    for (var A = 0; A < f; A += 4) {
                        var y = (K.charCodeAt(A) & 0xff) | ((K.charCodeAt(A + 1) & 0xff) << 8) | ((K.charCodeAt(A + 2) & 0xff) << 16) | ((K.charCodeAt(A + 3) & 0xff) << 24);
                        y = U(y, o);
                        y = ((y & 0x1ffff) << 15) | (y >>> 17);
                        y = U(y, Q);
                        T ^= y;
                        T = ((T & 0x7ffff) << 13) | (T >>> 19);
                        T = (T * 5 + 0xe6546b64) | 0;
                    }
                    y = 0;
                    switch (c % 4) {
                        case 3:
                            y = (K.charCodeAt(f + 2) & 0xff) << 16;
                        case 2:
                            y |= (K.charCodeAt(f + 1) & 0xff) << 8;
                        case 1:
                            y |= (K.charCodeAt(f) & 0xff);
                            y = U(y, o);
                            y = ((y & 0x1ffff) << 15) | (y >>> 17);
                            y = U(y, Q);
                            T ^= y;
                    }
                    T ^= c;
                    T ^= T >>> 16;
                    T = U(T, 0x85ebca6b);
                    T ^= T >>> 13;
                    T = U(T, 0xc2b2ae35);
                    T ^= T >>> 16;
                    e[m] = T;
                    return T;
                },
                L = function(h, P, Y) {
                    var k;
                    var z;
                    if (Y > 0) {
                        k = D.substring(h, Y);
                        z = k.length;
                        return Z(k, z, P);
                    } else if (h === null || h <= 0) {
                        k = D.substring(0, D.length);
                        z = k.length;
                        return Z(k, z, P);
                    }
                    k = D.substring(D.length - h, D.length);
                    z = k.length;
                    return Z(k, z, P);
                };
            return {
                U: U,
                Z: Z,
                L: L
            };
        })(function(d) {
            this.d = d;
            this.B = function(a) {
                var X = new String();
                for (var g = 0; g < d.length; g++) {
                    X += String.fromCharCode(d.charCodeAt(g) - a);
                }
                return X;
            }
        })
    };
    
    MyGame = ig.Game.extend({
        player: {
            candyType: 0,
        },
        init: function() {
            this.setupControls();
			this.setupLocalStorage();
			
            this.setupURLParameters();
            this.finalize();
        },
        initSfx: function() {},
        finalize: function() {
            //ig.game.showOverlay(['play']);
			ig.game.startGame();
            sizeHandler();
        },
        showDebugMenu: function() {
            console.log('showing debug menu ...');
            ig.Entity._debugShowBoxes = true;
            
            $('.ig_debug').show();
        },
        setupLocalStorage: function() {
			this.storage = new ig.Storage();
			this.hideOverlay(['play']);
            
        },
        startGame: function() {
			this.resetPlayerStats();
			
			this.director = new ig.Director(this, [LevelOpening, LevelGame]);
			
			this.director.loadLevel(this.director.currentLevel);
			
			this.spawnEntity(EntityPointerSelector, 50, 50);
        },
        endGame: function() {
            ig.soundHandler.stopBackgroundMusic();
        },
        resetPlayerStats: function() {
            //ig.soundHandler.forceLoopBGM();
			ig.log('resetting player stats ...');
            this.playerStats = {
                id: this.playerStats ? this.playerStats.id : null,
            };
        },
        setupControls: function() {
            ig.input.unbindAll();
            
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
        },
        setupURLParameters: function() {
            this.setupURLParameters = new ig.UrlParameters();
            
        },
        pressPlay: function() {
            this.startGame();
        },
        pauseGame: function() {
            ig.system.stopRunLoop.call(ig.system);
            console.log('Game Paused');
        },
        resumeGame: function() {
            ig.system.startRunLoop.call(ig.system);
            console.log('Game Resumed');
        },
        showOverlay: function(divList) {
            for (i = 0; i < divList.length; i++) {
                $('#' + divList[i]).show();
                //document.getElementById(divList[i]).style.visibility = "visible";
            }
        },
        hideOverlay: function(divList) {
            for (i = 0; i < divList.length; i++) {
                $('#' + divList[i]).hide();
                //document.getElementById(divList[i]).style.visibility = "hidden";
            }
        },
        update: function() {
            if (this.paused) {
                for (var i = 0; i < this.entities.length; i++) {
                    if (this.entities[i].ignorePause) {
                        this.entities[i].update();
                    }
                }
            } else {
                this.parent();
                if (ig.soundHandler) {
                    //ig.soundHandler.forceLoopBGM();
                }
            }
        },
        draw: function() {
            this.parent();
            this.fpsCounter++;
        },
        drawDebug: function() {
            if (!ig.global.wm) {
                this.debugEnable();
                if (this.viewDebug) {
                    ig.system.context.fillStyle = '#000000';
                    ig.system.context.globalAlpha = 0.35;
                    ig.system.context.fillRect(0, 0, ig.system.width / 4, ig.system.height);
                    ig.system.context.globalAlpha = 1;
                    if (this.debug && this.debug.length > 0) {
                        for (i = 0; i < this.debug.length; i++) {
                            ig.system.context.font = "10px Arial";
                            ig.system.context.fillStyle = '#ffffff';
                            ig.system.context.fillText(this.debugLine - this.debug.length + i + ": " + this.debug[i], 10, 50 + 10 * i);
                        }
                    }
                }
            }
        },
        debugCL: function(consoleLog) {
            if (!this.debug) {
                this.debug = [];
                this.debugLine = 1;
                this.debug.push(consoleLog);
            } else {
                if (this.debug.length < 50) {
                    this.debug.push(consoleLog);
                } else {
                    this.debug.splice(0, 1);
                    this.debug.push(consoleLog);
                }
                this.debugLine++;
            }
            console.log(consoleLog);
        },
        debugEnable: function() {
            if (ig.input.pressed('click')) {
                this.debugEnableTimer = new ig.Timer(2);
            }
            if (this.debugEnableTimer && this.debugEnableTimer.delta() < 0) {
                if (ig.input.released('click')) {
                    this.debugEnableTimer = null;
                }
            } else if (this.debugEnableTimer && this.debugEnableTimer.delta() > 0) {
                this.debugEnableTimer = null;
                if (this.viewDebug) {
                    this.viewDebug = false;
                } else {
                    this.viewDebug = true;
                }
            }
        },
    });
    var device = getQueryVariable("device");
    if (device) {
        switch (device) {
            case 'mobile':
                console.log('serving mobile version ...');
                ig.ua.mobile = true;
                break;
            case 'desktop':
                console.log('serving desktop version ...');
                ig.ua.mobile = false;
                break;
            default:
                console.log('serving universal version ...');
                break;
        }
    } else {
        console.log('serving universal version ...');
    }
    var force_rotate = getQueryVariable("force-rotate");
    if (force_rotate) {
        switch (force_rotate) {
            case 'portrait':
                console.log('force rotate to portrait');
                window.orientation = 0;
                break;
            case 'landscape':
                console.log('force rotate to horizontal');
                window.orientation = 90;
                break;
            default:
                alert('wrong command/type in param force-rotate. Defaulting value to portrait');
                window.orientation = 0;
        }
    }
    if (ig.ua.mobile) {
        ig.Sound.enabled = false;
        ig.main('#canvas', MyGame, 30, mobileWidth, mobileHeight, 1, ig.SplashLoader);
    } else {
        ig.main('#canvas', MyGame, 30, desktopWidth, desktopHeight, 1, ig.SplashLoader);
    }
    if (ig.ua.mobile) {
        orientationHandler();
    }
    sizeHandler();
    fixSamsungHandler();
    
});