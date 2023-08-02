
(function(b, c) {
    function d(q, b, r) {
        if (r === c && 1 === q.nodeType)
            if (r = "data-" + b.replace(tc, "-$1").toLowerCase(), r = q.getAttribute(r), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : uc.test(r) ? e.parseJSON(r) : r
                } catch (B) {}
                e.data(q, b, r)
            } else r = c;
        return r
    }

    function f(q) {
        for (var b in q)
            if (!("data" === b && e.isEmptyObject(q[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function g() {
        return !1
    }

    function l() {
        return !0
    }

    function p(q) {
        return !q || !q.parentNode || 11 === q.parentNode.nodeType
    }

    function x(q,
        b) {
        do q = q[b]; while (q && 1 !== q.nodeType);
        return q
    }

    function s(q, b, c) {
        b = b || 0;
        if (e.isFunction(b)) return e.grep(q, function(q, e) {
            return !!b.call(q, e, q) === c
        });
        if (b.nodeType) return e.grep(q, function(q) {
            return q === b === c
        });
        if ("string" == typeof b) {
            var B = e.grep(q, function(q) {
                return 1 === q.nodeType
            });
            if (vc.test(b)) return e.filter(b, B, !c);
            b = e.filter(b, B)
        }
        return e.grep(q, function(q) {
            return 0 <= e.inArray(q, b) === c
        })
    }

    function y(q) {
        var b = xb.split("|");
        q = q.createDocumentFragment();
        if (q.createElement)
            for (; b.length;) q.createElement(b.pop());
        return q
    }

    function u(q, b) {
        if (1 === b.nodeType && e.hasData(q)) {
            var c, B, d;
            B = e._data(q);
            var A = e._data(b, B),
                t = B.events;
            if (t)
                for (c in delete A.handle, A.events = {}, t) {
                    B = 0;
                    for (d = t[c].length; B < d; B++) e.event.add(b, c, t[c][B])
                }
            A.data && (A.data = e.extend({}, A.data))
        }
    }

    function j(q, b) {
        var c;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(q), c = b.nodeName.toLowerCase(), "object" === c ? (b.parentNode && (b.outerHTML = q.outerHTML), e.support.html5Clone && q.innerHTML && !e.trim(b.innerHTML) &&
            (b.innerHTML = q.innerHTML)) : "input" === c && yb.test(q.type) ? (b.defaultChecked = b.checked = q.checked, b.value !== q.value && (b.value = q.value)) : "option" === c ? b.selected = q.defaultSelected : "input" === c || "textarea" === c ? b.defaultValue = q.defaultValue : "script" === c && b.text !== q.text && (b.text = q.text), b.removeAttribute(e.expando))
    }

    function m(q) {
        return "undefined" != typeof q.getElementsByTagName ? q.getElementsByTagName("*") : "undefined" != typeof q.querySelectorAll ? q.querySelectorAll("*") : []
    }

    function v(q) {
        yb.test(q.type) && (q.defaultChecked =
            q.checked)
    }

    function D(q, b) {
        if (b in q) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), e = b, d = zb.length; d--;)
            if (b = zb[d] + c, b in q) return b;
        return e
    }

    function N(q, b) {
        return q = b || q, "none" === e.css(q, "display") || !e.contains(q.ownerDocument, q)
    }

    function F(q, b) {
        for (var c, B, d = [], A = 0, t = q.length; A < t; A++) c = q[A], c.style && (d[A] = e._data(c, "olddisplay"), b ? (!d[A] && "none" === c.style.display && (c.style.display = ""), "" === c.style.display && N(c) && (d[A] = e._data(c, "olddisplay", P(c.nodeName)))) : (B = Q(c, "display"), !d[A] && "none" !==
            B && e._data(c, "olddisplay", B)));
        for (A = 0; A < t; A++)
            if (c = q[A], c.style && (!b || "none" === c.style.display || "" === c.style.display)) c.style.display = b ? d[A] || "" : "none";
        return q
    }

    function E(q, b, c) {
        return (q = wc.exec(b)) ? Math.max(0, q[1] - (c || 0)) + (q[2] || "px") : b
    }

    function Ya(q, b, c, d) {
        b = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var z = 0; 4 > b; b += 2) "margin" === c && (z += e.css(q, c + ea[b], !0)), d ? ("content" === c && (z -= parseFloat(Q(q, "padding" + ea[b])) || 0), "margin" !== c && (z -= parseFloat(Q(q, "border" + ea[b] + "Width")) || 0)) : (z += parseFloat(Q(q,
            "padding" + ea[b])) || 0, "padding" !== c && (z += parseFloat(Q(q, "border" + ea[b] + "Width")) || 0));
        return z
    }

    function H(b, n, c) {
        var d = "width" === n ? b.offsetWidth : b.offsetHeight,
            z = !0,
            A = e.support.boxSizing && "border-box" === e.css(b, "boxSizing");
        if (0 >= d || null == d) {
            d = Q(b, n);
            if (0 > d || null == d) d = b.style[n];
            if (ya.test(d)) return d;
            z = A && (e.support.boxSizingReliable || d === b.style[n]);
            d = parseFloat(d) || 0
        }
        return d + Ya(b, n, c || (A ? "border" : "content"), z) + "px"
    }

    function P(b) {
        if (Za[b]) return Za[b];
        var n = e("<" + b + ">").appendTo(C.body),
            c = n.css("display");
        n.remove();
        if ("none" === c || "" === c) {
            la = C.body.appendChild(la || e.extend(C.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!ma || !la.createElement) ma = (la.contentWindow || la.contentDocument).document, ma.write("<!doctype html><html><body>"), ma.close();
            n = ma.body.appendChild(ma.createElement(b));
            c = Q(n, "display");
            C.body.removeChild(la)
        }
        return Za[b] = c, c
    }

    function M(b, n, c, d) {
        var z;
        if (e.isArray(n)) e.each(n, function(n, e) {
            c || xc.test(b) ? d(b, e) : M(b + "[" + ("object" == typeof e ? n : "") + "]", e, c, d)
        });
        else if (!c &&
            "object" === e.type(n))
            for (z in n) M(b + "[" + z + "]", n[z], c, d);
        else d(b, n)
    }

    function za(b) {
        return function(n, c) {
            "string" != typeof n && (c = n, n = "*");
            var d, z, A = n.toLowerCase().split(fa),
                t = 0,
                f = A.length;
            if (e.isFunction(c))
                for (; t < f; t++) d = A[t], (z = /^\+/.test(d)) && (d = d.substr(1) || "*"), d = b[d] = b[d] || [], d[z ? "unshift" : "push"](c)
        }
    }

    function na(b, n, r, e, d, A) {
        d = d || n.dataTypes[0];
        A = A || {};
        A[d] = !0;
        var t;
        d = b[d];
        for (var f = 0, j = d ? d.length : 0, g = b === $a; f < j && (g || !t); f++) t = d[f](n, r, e), "string" == typeof t && (!g || A[t] ? t = c : (n.dataTypes.unshift(t),
            t = na(b, n, r, e, t, A)));
        return (g || !t) && !A["*"] && (t = na(b, n, r, e, "*", A)), t
    }

    function sa(b, n) {
        var r, d, z = e.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== c && ((z[r] ? b : d || (d = {}))[r] = n[r]);
        d && e.extend(!0, b, d)
    }

    function Ab() {
        try {
            return new b.XMLHttpRequest
        } catch (q) {}
    }

    function Bb() {
        return setTimeout(function() {
            Aa = c
        }, 0), Aa = e.now()
    }

    function Cb(b, n, c) {
        var d, z = 0,
            A = Ba.length,
            t = e.Deferred().always(function() {
                delete f.elem
            }),
            f = function() {
                for (var n = Aa || Bb(), n = Math.max(0, j.startTime + j.duration - n), c = 1 - (n / j.duration || 0), r =
                        0, e = j.tweens.length; r < e; r++) j.tweens[r].run(c);
                return t.notifyWith(b, [j, c, n]), 1 > c && e ? n : (t.resolveWith(b, [j]), !1)
            },
            j = t.promise({
                elem: b,
                props: e.extend({}, n),
                opts: e.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: n,
                originalOptions: c,
                startTime: Aa || Bb(),
                duration: c.duration,
                tweens: [],
                createTween: function(n, c) {
                    var r = e.Tween(b, j.opts, n, c, j.opts.specialEasing[n] || j.opts.easing);
                    return j.tweens.push(r), r
                },
                stop: function(n) {
                    for (var c = 0, r = n ? j.tweens.length : 0; c < r; c++) j.tweens[c].run(1);
                    return n ? t.resolveWith(b, [j, n]) : t.rejectWith(b, [j, n]), this
                }
            });
        n = j.props;
        c = j.opts.specialEasing;
        var g, m, l, v;
        for (d in n)
            if (g = e.camelCase(d), m = c[g], l = n[d], e.isArray(l) && (m = l[1], l = n[d] = l[0]), d !== g && (n[g] = l, delete n[d]), (v = e.cssHooks[g]) && "expand" in v)
                for (d in l = v.expand(l), delete n[g], l) d in n || (n[d] = l[d], c[d] = m);
            else c[g] = m;
        for (; z < A; z++)
            if (d = Ba[z].call(j, b, n, j.opts)) return d;
        var s = j;
        e.each(n, function(b, q) {
            for (var n = (ta[b] || []).concat(ta["*"]), c = 0, r = n.length; c < r && !n[c].call(s, b, q); c++);
        });
        return e.isFunction(j.opts.start) && j.opts.start.call(b,
            j), e.fx.timer(e.extend(f, {
            anim: j,
            queue: j.opts.queue,
            elem: b
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function S(b, n, c, e, d) {
        return new S.prototype.init(b, n, c, e, d)
    }

    function Da(b, n) {
        var c, e = {
                height: b
            },
            d = 0;
        for (n = n ? 1 : 0; 4 > d; d += 2 - n) c = ea[d], e["margin" + c] = e["padding" + c] = b;
        return n && (e.opacity = e.width = b), e
    }

    function Db(b) {
        return e.isWindow(b) ? b : 9 === b.nodeType ? b.defaultView || b.parentWindow : !1
    }
    var Eb, Ea, C = b.document,
        zc = b.location,
        Ac = b.navigator,
        Bc =
        b.jQuery,
        Cc = b.$,
        Fb = Array.prototype.push,
        aa = Array.prototype.slice,
        Gb = Array.prototype.indexOf,
        Dc = Object.prototype.toString,
        ab = Object.prototype.hasOwnProperty,
        bb = String.prototype.trim,
        e = function(b, n) {
            return new e.fn.init(b, n, Eb)
        },
        Fa = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        Ec = /\S/,
        fa = /\s+/,
        Fc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Gc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Hb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Hc = /^[\],:{}\s]*$/,
        Ic = /(?:^|:|,)(?:\s*\[)+/g,
        Jc = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Kc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        Lc = /^-ms-/,
        Mc = /-([\da-z])/gi,
        Nc = function(b, n) {
            return (n + "").toUpperCase()
        },
        Ga = function() {
            C.addEventListener ? (C.removeEventListener("DOMContentLoaded", Ga, !1), e.ready()) : "complete" === C.readyState && (C.detachEvent("onreadystatechange", Ga), e.ready())
        },
        Ib = {};
    e.fn = e.prototype = {
        constructor: e,
        init: function(b, n, r) {
            var d, z;
            if (!b) return this;
            if (b.nodeType) return this.context = this[0] = b, this.length = 1, this;
            if ("string" == typeof b) {
                "<" === b.charAt(0) && ">" === b.charAt(b.length - 1) && 3 <= b.length ? d = [null, b, null] : d = Gc.exec(b);
                if (d && (d[1] || !n)) {
                    if (d[1]) return n = n instanceof e ? n[0] : n, z = n && n.nodeType ? n.ownerDocument || n : C, b = e.parseHTML(d[1], z, !0), Hb.test(d[1]) && e.isPlainObject(n) && this.attr.call(b, n, !0), e.merge(this, b);
                    if ((n = C.getElementById(d[2])) && n.parentNode) {
                        if (n.id !== d[2]) return r.find(b);
                        this.length = 1;
                        this[0] = n
                    }
                    return this.context = C, this.selector = b, this
                }
                return !n || n.jquery ? (n || r).find(b) : this.constructor(n).find(b)
            }
            return e.isFunction(b) ? r.ready(b) : (b.selector !== c && (this.selector = b.selector, this.context = b.context), e.makeArray(b,
                this))
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return aa.call(this)
        },
        get: function(b) {
            return null == b ? this.toArray() : 0 > b ? this[this.length + b] : this[b]
        },
        pushStack: function(b, n, c) {
            b = e.merge(this.constructor(), b);
            return b.prevObject = this, b.context = this.context, "find" === n ? b.selector = this.selector + (this.selector ? " " : "") + c : n && (b.selector = this.selector + "." + n + "(" + c + ")"), b
        },
        each: function(b, n) {
            return e.each(this, b, n)
        },
        ready: function(b) {
            return e.ready.promise().done(b),
                this
        },
        eq: function(b) {
            return b = +b, -1 === b ? this.slice(b) : this.slice(b, b + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(aa.apply(this, arguments), "slice", aa.call(arguments).join(","))
        },
        map: function(b) {
            return this.pushStack(e.map(this, function(n, c) {
                return b.call(n, c, n)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Fb,
        sort: [].sort,
        splice: [].splice
    };
    e.fn.init.prototype = e.fn;
    e.extend = e.fn.extend = function() {
        var b,
            n, r, d, z, A, t = arguments[0] || {},
            j = 1,
            f = arguments.length,
            g = !1;
        "boolean" == typeof t && (g = t, t = arguments[1] || {}, j = 2);
        "object" != typeof t && !e.isFunction(t) && (t = {});
        for (f === j && (t = this, --j); j < f; j++)
            if (null != (b = arguments[j]))
                for (n in b) r = t[n], d = b[n], t !== d && (g && d && (e.isPlainObject(d) || (z = e.isArray(d))) ? (z ? (z = !1, A = r && e.isArray(r) ? r : []) : A = r && e.isPlainObject(r) ? r : {}, t[n] = e.extend(g, A, d)) : d !== c && (t[n] = d));
        return t
    };
    e.extend({
        noConflict: function(q) {
            return b.$ === e && (b.$ = Cc), q && b.jQuery === e && (b.jQuery = Bc), e
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(b) {
            b ? e.readyWait++ : e.ready(!0)
        },
        ready: function(b) {
            if (!(!0 === b ? --e.readyWait : e.isReady)) {
                if (!C.body) return setTimeout(e.ready, 1);
                e.isReady = !0;
                !0 !== b && 0 < --e.readyWait || (Ea.resolveWith(C, [e]), e.fn.trigger && e(C).trigger("ready").off("ready"))
            }
        },
        isFunction: function(b) {
            return "function" === e.type(b)
        },
        isArray: Array.isArray || function(b) {
            return "array" === e.type(b)
        },
        isWindow: function(b) {
            return null != b && b == b.window
        },
        isNumeric: function(b) {
            return !isNaN(parseFloat(b)) && isFinite(b)
        },
        type: function(b) {
            return null == b ? String(b) : Ib[Dc.call(b)] || "object"
        },
        isPlainObject: function(b) {
            if (!b || "object" !== e.type(b) || b.nodeType || e.isWindow(b)) return !1;
            try {
                if (b.constructor && !ab.call(b, "constructor") && !ab.call(b.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            for (var r in b);
            return r === c || ab.call(b, r)
        },
        isEmptyObject: function(b) {
            for (var n in b) return !1;
            return !0
        },
        error: function(b) {
            throw Error(b);
        },
        parseHTML: function(b, n, c) {
            var d;
            return !b || "string" != typeof b ? null : ("boolean" ==
                typeof n && (c = n, n = 0), n = n || C, (d = Hb.exec(b)) ? [n.createElement(d[1])] : (d = e.buildFragment([b], n, c ? null : []), e.merge([], (d.cacheable ? e.clone(d.fragment) : d.fragment).childNodes)))
        },
        parseJSON: function(q) {
            if (!q || "string" != typeof q) return null;
            q = e.trim(q);
            if (b.JSON && b.JSON.parse) return b.JSON.parse(q);
            if (Hc.test(q.replace(Jc, "@").replace(Kc, "]").replace(Ic, ""))) return (new Function("return " + q))();
            e.error("Invalid JSON: " + q)
        },
        parseXML: function(q) {
            var n, r;
            if (!q || "string" != typeof q) return null;
            try {
                b.DOMParser ?
                    (r = new DOMParser, n = r.parseFromString(q, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(q))
            } catch (d) {
                n = c
            }
            return (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + q), n
        },
        noop: function() {},
        globalEval: function(q) {
            q && Ec.test(q) && (b.execScript || function(q) {
                b.eval.call(b, q)
            })(q)
        },
        camelCase: function(b) {
            return b.replace(Lc, "ms-").replace(Mc, Nc)
        },
        nodeName: function(b, c) {
            return b.nodeName && b.nodeName.toLowerCase() === c.toLowerCase()
        },
        each: function(b, n, r) {
            var d, z = 0,
                A = b.length,
                t = A === c || e.isFunction(b);
            if (r)
                if (t)
                    for (d in b) {
                        if (!1 === n.apply(b[d], r)) break
                    } else
                        for (; z < A && !1 !== n.apply(b[z++], r););
                else if (t)
                for (d in b) {
                    if (!1 === n.call(b[d], d, b[d])) break
                } else
                    for (; z < A && !1 !== n.call(b[z], z, b[z++]););
            return b
        },
        trim: bb && !bb.call("\ufeff\u00a0") ? function(b) {
            return null == b ? "" : bb.call(b)
        } : function(b) {
            return null == b ? "" : (b + "").replace(Fc, "")
        },
        makeArray: function(b, c) {
            var r, d = c || [];
            return null != b && (r = e.type(b), null == b.length || "string" === r || "function" ===
                r || "regexp" === r || e.isWindow(b) ? Fb.call(d, b) : e.merge(d, b)), d
        },
        inArray: function(b, c, r) {
            var e;
            if (c) {
                if (Gb) return Gb.call(c, b, r);
                e = c.length;
                for (r = r ? 0 > r ? Math.max(0, e + r) : r : 0; r < e; r++)
                    if (r in c && c[r] === b) return r
            }
            return -1
        },
        merge: function(b, n) {
            var r = n.length,
                e = b.length,
                d = 0;
            if ("number" == typeof r)
                for (; d < r; d++) b[e++] = n[d];
            else
                for (; n[d] !== c;) b[e++] = n[d++];
            return b.length = e, b
        },
        grep: function(b, c, r) {
            var e, d = [],
                A = 0,
                t = b.length;
            for (r = !!r; A < t; A++) e = !!c(b[A], A), r !== e && d.push(b[A]);
            return d
        },
        map: function(b, n, r) {
            var d,
                z, A = [],
                t = 0,
                j = b.length;
            if (b instanceof e || j !== c && "number" == typeof j && (0 < j && b[0] && b[j - 1] || 0 === j || e.isArray(b)))
                for (; t < j; t++) d = n(b[t], t, r), null != d && (A[A.length] = d);
            else
                for (z in b) d = n(b[z], z, r), null != d && (A[A.length] = d);
            return A.concat.apply([], A)
        },
        guid: 1,
        proxy: function(b, n) {
            var r, d, z;
            return "string" == typeof n && (r = b[n], n = b, b = r), e.isFunction(b) ? (d = aa.call(arguments, 2), z = function() {
                return b.apply(n, d.concat(aa.call(arguments)))
            }, z.guid = b.guid = b.guid || e.guid++, z) : c
        },
        access: function(b, n, r, d, z, A, t) {
            var j, f =
                null == r,
                g = 0,
                m = b.length;
            if (r && "object" == typeof r) {
                for (g in r) e.access(b, n, g, r[g], 1, A, d);
                z = 1
            } else if (d !== c) {
                j = t === c && e.isFunction(d);
                f && (j ? (j = n, n = function(b, q, c) {
                    return j.call(e(b), c)
                }) : (n.call(b, d), n = null));
                if (n)
                    for (; g < m; g++) n(b[g], r, j ? d.call(b[g], g, n(b[g], r)) : d, t);
                z = 1
            }
            return z ? b : f ? n.call(b) : m ? n(b[0], r) : A
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    e.ready.promise = function(q) {
        if (!Ea)
            if (Ea = e.Deferred(), "complete" === C.readyState) setTimeout(e.ready, 1);
            else if (C.addEventListener) C.addEventListener("DOMContentLoaded",
            Ga, !1), b.addEventListener("load", e.ready, !1);
        else {
            C.attachEvent("onreadystatechange", Ga);
            b.attachEvent("onload", e.ready);
            var c = !1;
            try {
                c = null == b.frameElement && C.documentElement
            } catch (r) {}
            c && c.doScroll && function z() {
                if (!e.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (b) {
                        return setTimeout(z, 50)
                    }
                    e.ready()
                }
            }()
        }
        return Ea.promise(q)
    };
    e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(b, c) {
        Ib["[object " + c + "]"] = c.toLowerCase()
    });
    Eb = e(C);
    var Jb = {};
    e.Callbacks = function(b) {
        var n;
        if ("string" ==
            typeof b) {
            if (!(n = Jb[b])) {
                n = b;
                var r = Jb[n] = {};
                n = (e.each(n.split(fa), function(b, q) {
                    r[q] = !0
                }), r)
            }
        } else n = e.extend({}, b);
        b = n;
        var d, z, A, t, j, f, g = [],
            m = !b.once && [],
            l = function(c) {
                d = b.memory && c;
                z = !0;
                f = t || 0;
                t = 0;
                j = g.length;
                for (A = !0; g && f < j; f++)
                    if (!1 === g[f].apply(c[0], c[1]) && b.stopOnFalse) {
                        d = !1;
                        break
                    }
                A = !1;
                g && (m ? m.length && l(m.shift()) : d ? g = [] : v.disable())
            },
            v = {
                add: function() {
                    if (g) {
                        var c = g.length;
                        (function yc(c) {
                            e.each(c, function(c, n) {
                                var r = e.type(n);
                                "function" === r && (!b.unique || !v.has(n)) ? g.push(n) : n && n.length && "string" !==
                                    r && yc(n)
                            })
                        })(arguments);
                        A ? j = g.length : d && (t = c, l(d))
                    }
                    return this
                },
                remove: function() {
                    return g && e.each(arguments, function(b, q) {
                        for (var c; - 1 < (c = e.inArray(q, g, c));) g.splice(c, 1), A && (c <= j && j--, c <= f && f--)
                    }), this
                },
                has: function(b) {
                    return -1 < e.inArray(b, g)
                },
                empty: function() {
                    return g = [], this
                },
                disable: function() {
                    return g = m = d = c, this
                },
                disabled: function() {
                    return !g
                },
                lock: function() {
                    return m = c, d || v.disable(), this
                },
                locked: function() {
                    return !m
                },
                fireWith: function(b, q) {
                    return q = q || [], q = [b, q.slice ? q.slice() : q], g && (!z || m) &&
                        (A ? m.push(q) : l(q)), this
                },
                fire: function() {
                    return v.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!z
                }
            };
        return v
    };
    e.extend({
        Deferred: function(b) {
            var c = [
                    ["resolve", "done", e.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", e.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", e.Callbacks("memory")]
                ],
                r = "pending",
                d = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return z.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var b = arguments;
                        return e.Deferred(function(q) {
                            e.each(c, function(c,
                                n) {
                                var r = n[0],
                                    d = b[c];
                                z[n[1]](e.isFunction(d) ? function() {
                                    var b = d.apply(this, arguments);
                                    b && e.isFunction(b.promise) ? b.promise().done(q.resolve).fail(q.reject).progress(q.notify) : q[r + "With"](this === z ? q : this, [b])
                                } : q[r])
                            });
                            b = null
                        }).promise()
                    },
                    promise: function(b) {
                        return null != b ? e.extend(b, d) : d
                    }
                },
                z = {};
            return d.pipe = d.then, e.each(c, function(b, q) {
                var e = q[2],
                    j = q[3];
                d[q[1]] = e.add;
                j && e.add(function() {
                    r = j
                }, c[b ^ 1][2].disable, c[2][2].lock);
                z[q[0]] = e.fire;
                z[q[0] + "With"] = e.fireWith
            }), d.promise(z), b && b.call(z, z), z
        },
        when: function(b) {
            var c = 0,
                r = aa.call(arguments),
                d = r.length,
                z = 1 !== d || b && e.isFunction(b.promise) ? d : 0,
                j = 1 === z ? b : e.Deferred(),
                t = function(b, q, c) {
                    return function(n) {
                        q[b] = this;
                        c[b] = 1 < arguments.length ? aa.call(arguments) : n;
                        c === f ? j.notifyWith(q, c) : --z || j.resolveWith(q, c)
                    }
                },
                f, g, m;
            if (1 < d) {
                f = Array(d);
                g = Array(d);
                for (m = Array(d); c < d; c++) r[c] && e.isFunction(r[c].promise) ? r[c].promise().done(t(c, m, r)).fail(j.reject).progress(t(c, g, f)) : --z
            }
            return z || j.resolveWith(m, r), j.promise()
        }
    });
    var Oc = e,
        cb, O, Ha, ga, Ia, Ja, T, ha, Ka, db,
        ua, Kb, K = C.createElement("div");
    K.setAttribute("className", "t");
    K.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    Ha = K.getElementsByTagName("*");
    ga = K.getElementsByTagName("a")[0];
    ga.style.cssText = "top:1px;float:left;opacity:.5";
    if (!Ha || !Ha.length) cb = {};
    else {
        Ia = C.createElement("select");
        Ja = Ia.appendChild(C.createElement("option"));
        T = K.getElementsByTagName("input")[0];
        O = {
            leadingWhitespace: 3 === K.firstChild.nodeType,
            tbody: !K.getElementsByTagName("tbody").length,
            htmlSerialize: !!K.getElementsByTagName("link").length,
            style: /top/.test(ga.getAttribute("style")),
            hrefNormalized: "/a" === ga.getAttribute("href"),
            opacity: /^0.5/.test(ga.style.opacity),
            cssFloat: !!ga.style.cssFloat,
            checkOn: "on" === T.value,
            optSelected: Ja.selected,
            getSetAttribute: "t" !== K.className,
            enctype: !!C.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== C.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === C.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        T.checked = !0;
        O.noCloneChecked = T.cloneNode(!0).checked;
        Ia.disabled = !0;
        O.optDisabled = !Ja.disabled;
        try {
            delete K.test
        } catch (Qd) {
            O.deleteExpando = !1
        }!K.addEventListener && K.attachEvent && K.fireEvent && (K.attachEvent("onclick", Kb = function() {
            O.noCloneEvent = !1
        }), K.cloneNode(!0).fireEvent("onclick"), K.detachEvent("onclick", Kb));
        T = C.createElement("input");
        T.value = "t";
        T.setAttribute("type", "radio");
        O.radioValue = "t" === T.value;
        T.setAttribute("checked",
            "checked");
        T.setAttribute("name", "t");
        K.appendChild(T);
        ha = C.createDocumentFragment();
        ha.appendChild(K.lastChild);
        O.checkClone = ha.cloneNode(!0).cloneNode(!0).lastChild.checked;
        O.appendChecked = T.checked;
        ha.removeChild(T);
        ha.appendChild(K);
        if (K.attachEvent)
            for (db in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) Ka = "on" + db, (ua = Ka in K) || (K.setAttribute(Ka, "return;"), ua = "function" == typeof K[Ka]), O[db + "Bubbles"] = ua;
        cb = (e(function() {
            var q, c, d, e, z = C.getElementsByTagName("body")[0];
            z && (q = C.createElement("div"), q.style.cssText =
                "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", z.insertBefore(q, z.firstChild), c = C.createElement("div"), q.appendChild(c), c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", d = c.getElementsByTagName("td"), d[0].style.cssText = "padding:0;margin:0;border:0;display:none", ua = 0 === d[0].offsetHeight, d[0].style.display = "", d[1].style.display = "none", O.reliableHiddenOffsets = ua && 0 === d[0].offsetHeight, c.innerHTML = "", c.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                O.boxSizing = 4 === c.offsetWidth, O.doesNotIncludeMarginInBodyOffset = 1 !== z.offsetTop, b.getComputedStyle && (O.pixelPosition = "1%" !== (b.getComputedStyle(c, null) || {}).top, O.boxSizingReliable = "4px" === (b.getComputedStyle(c, null) || {
                    width: "4px"
                }).width, e = C.createElement("div"), e.style.cssText = c.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;", e.style.marginRight = e.style.width = "0", c.style.width = "1px", c.appendChild(e), O.reliableMarginRight = !parseFloat((b.getComputedStyle(e, null) || {}).marginRight)),
                "undefined" != typeof c.style.zoom && (c.innerHTML = "", c.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", O.inlineBlockNeedsLayout = 3 === c.offsetWidth, c.style.display = "block", c.style.overflow = "visible", c.innerHTML = "<div></div>", c.firstChild.style.width = "5px", O.shrinkWrapBlocks = 3 !== c.offsetWidth, q.style.zoom = 1), z.removeChild(q))
        }), ha.removeChild(K), Ha = ga = Ia = Ja = T = ha = K = null, O)
    }
    Oc.support = cb;
    var uc = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        tc = /([A-Z])/g;
    e.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (e.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(b) {
            return b = b.nodeType ? e.cache[b[e.expando]] : b[e.expando], !!b && !f(b)
        },
        data: function(b, n, d, B) {
            if (e.acceptData(b)) {
                var z, j, t = e.expando,
                    f = "string" == typeof n,
                    g = b.nodeType,
                    m = g ? e.cache : b,
                    l = g ? b[t] : b[t] && t;
                if (l && m[l] && (B || m[l].data) || !(f && d === c)) {
                    l || (g ? b[t] = l = e.deletedIds.pop() || e.guid++ : l = t);
                    m[l] || (m[l] = {},
                        g || (m[l].toJSON = e.noop));
                    if ("object" == typeof n || "function" == typeof n) B ? m[l] = e.extend(m[l], n) : m[l].data = e.extend(m[l].data, n);
                    return z = m[l], B || (z.data || (z.data = {}), z = z.data), d !== c && (z[e.camelCase(n)] = d), f ? (j = z[n], null == j && (j = z[e.camelCase(n)])) : j = z, j
                }
            }
        },
        removeData: function(b, c, d) {
            if (e.acceptData(b)) {
                var B, z, j, t = b.nodeType,
                    g = t ? e.cache : b,
                    m = t ? b[e.expando] : e.expando;
                if (g[m]) {
                    if (c && (B = d ? g[m] : g[m].data)) {
                        e.isArray(c) || (c in B ? c = [c] : (c = e.camelCase(c), c in B ? c = [c] : c = c.split(" ")));
                        z = 0;
                        for (j = c.length; z < j; z++) delete B[c[z]];
                        if (!(d ? f : e.isEmptyObject)(B)) return
                    }
                    if (d || !(delete g[m].data, !f(g[m]))) t ? e.cleanData([b], !0) : e.support.deleteExpando || g != g.window ? delete g[m] : g[m] = null
                }
            }
        },
        _data: function(b, c, d) {
            return e.data(b, c, d, !0)
        },
        acceptData: function(b) {
            var c = b.nodeName && e.noData[b.nodeName.toLowerCase()];
            return !c || !0 !== c && b.getAttribute("classid") === c
        }
    });
    e.fn.extend({
        data: function(b, n) {
            var r, B, z, j, t, f = this[0],
                g = 0,
                m = null;
            if (b === c) {
                if (this.length && (m = e.data(f), 1 === f.nodeType && !e._data(f, "parsedAttrs"))) {
                    z = f.attributes;
                    for (t = z.length; g <
                        t; g++) j = z[g].name, j.indexOf("data-") || (j = e.camelCase(j.substring(5)), d(f, j, m[j]));
                    e._data(f, "parsedAttrs", !0)
                }
                return m
            }
            return "object" == typeof b ? this.each(function() {
                e.data(this, b)
            }) : (r = b.split(".", 2), r[1] = r[1] ? "." + r[1] : "", B = r[1] + "!", e.access(this, function(n) {
                if (n === c) return m = this.triggerHandler("getData" + B, [r[0]]), m === c && f && (m = e.data(f, b), m = d(f, b, m)), m === c && r[1] ? this.data(r[0]) : m;
                r[1] = n;
                this.each(function() {
                    var c = e(this);
                    c.triggerHandler("setData" + B, r);
                    e.data(this, b, n);
                    c.triggerHandler("changeData" +
                        B, r)
                })
            }, null, n, 1 < arguments.length, null, !1))
        },
        removeData: function(b) {
            return this.each(function() {
                e.removeData(this, b)
            })
        }
    });
    e.extend({
        queue: function(b, c, d) {
            var B;
            if (b) return c = (c || "fx") + "queue", B = e._data(b, c), d && (!B || e.isArray(d) ? B = e._data(b, c, e.makeArray(d)) : B.push(d)), B || []
        },
        dequeue: function(b, c) {
            c = c || "fx";
            var d = e.queue(b, c),
                B = d.length,
                z = d.shift(),
                j = e._queueHooks(b, c),
                t = function() {
                    e.dequeue(b, c)
                };
            "inprogress" === z && (z = d.shift(), B--);
            z && ("fx" === c && d.unshift("inprogress"), delete j.stop, z.call(b, t, j));
            !B && j && j.empty.fire()
        },
        _queueHooks: function(b, c) {
            var d = c + "queueHooks";
            return e._data(b, d) || e._data(b, d, {
                empty: e.Callbacks("once memory").add(function() {
                    e.removeData(b, c + "queue", !0);
                    e.removeData(b, d, !0)
                })
            })
        }
    });
    e.fn.extend({
        queue: function(b, n) {
            var d = 2;
            return "string" != typeof b && (n = b, b = "fx", d--), arguments.length < d ? e.queue(this[0], b) : n === c ? this : this.each(function() {
                var c = e.queue(this, b, n);
                e._queueHooks(this, b);
                "fx" === b && "inprogress" !== c[0] && e.dequeue(this, b)
            })
        },
        dequeue: function(b) {
            return this.each(function() {
                e.dequeue(this,
                    b)
            })
        },
        delay: function(b, c) {
            return b = e.fx ? e.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, n) {
                var d = setTimeout(c, b);
                n.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(b) {
            return this.queue(b || "fx", [])
        },
        promise: function(b, n) {
            var d, B = 1,
                z = e.Deferred(),
                j = this,
                t = this.length,
                f = function() {
                    --B || z.resolveWith(j, [j])
                };
            "string" != typeof b && (n = b, b = c);
            for (b = b || "fx"; t--;)(d = e._data(j[t], b + "queueHooks")) && d.empty && (B++, d.empty.add(f));
            return f(), z.promise(n)
        }
    });
    var ba, Lb, Mb, Nb = /[\t\r\n]/g,
        Pc = /\r/g,
        Qc = /^(?:button|input)$/i,
        Rc = /^(?:button|input|object|select|textarea)$/i,
        Sc = /^a(?:rea|)$/i,
        Ob = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Pb = e.support.getSetAttribute;
    e.fn.extend({
        attr: function(b, c) {
            return e.access(this, e.attr, b, c, 1 < arguments.length)
        },
        removeAttr: function(b) {
            return this.each(function() {
                e.removeAttr(this, b)
            })
        },
        prop: function(b, c) {
            return e.access(this, e.prop, b, c, 1 < arguments.length)
        },
        removeProp: function(b) {
            return b = e.propFix[b] ||
                b, this.each(function() {
                    try {
                        this[b] = c, delete this[b]
                    } catch (n) {}
                })
        },
        addClass: function(b) {
            var c, d, B, z, j, t, f;
            if (e.isFunction(b)) return this.each(function(c) {
                e(this).addClass(b.call(this, c, this.className))
            });
            if (b && "string" == typeof b) {
                c = b.split(fa);
                d = 0;
                for (B = this.length; d < B; d++)
                    if (z = this[d], 1 === z.nodeType)
                        if (!z.className && 1 === c.length) z.className = b;
                        else {
                            j = " " + z.className + " ";
                            t = 0;
                            for (f = c.length; t < f; t++) 0 > j.indexOf(" " + c[t] + " ") && (j += c[t] + " ");
                            z.className = e.trim(j)
                        }
            }
            return this
        },
        removeClass: function(b) {
            var n,
                d, B, z, j, t, f;
            if (e.isFunction(b)) return this.each(function(c) {
                e(this).removeClass(b.call(this, c, this.className))
            });
            if (b && "string" == typeof b || b === c) {
                n = (b || "").split(fa);
                t = 0;
                for (f = this.length; t < f; t++)
                    if (B = this[t], 1 === B.nodeType && B.className) {
                        d = (" " + B.className + " ").replace(Nb, " ");
                        z = 0;
                        for (j = n.length; z < j; z++)
                            for (; 0 <= d.indexOf(" " + n[z] + " ");) d = d.replace(" " + n[z] + " ", " ");
                        B.className = b ? e.trim(d) : ""
                    }
            }
            return this
        },
        toggleClass: function(b, c) {
            var d = typeof b,
                B = "boolean" == typeof c;
            return e.isFunction(b) ? this.each(function(d) {
                e(this).toggleClass(b.call(this,
                    d, this.className, c), c)
            }) : this.each(function() {
                if ("string" === d)
                    for (var j, f = 0, t = e(this), g = c, m = b.split(fa); j = m[f++];) g = B ? g : !t.hasClass(j), t[g ? "addClass" : "removeClass"](j);
                else if ("undefined" === d || "boolean" === d) this.className && e._data(this, "__className__", this.className), this.className = this.className || !1 === b ? "" : e._data(this, "__className__") || ""
            })
        },
        hasClass: function(b) {
            b = " " + b + " ";
            for (var c = 0, d = this.length; c < d; c++)
                if (1 === this[c].nodeType && 0 <= (" " + this[c].className + " ").replace(Nb, " ").indexOf(b)) return !0;
            return !1
        },
        val: function(b) {
            var n, d, B, j = this[0];
            if (arguments.length) return B = e.isFunction(b), this.each(function(d) {
                var r, j = e(this);
                if (1 === this.nodeType && (B ? r = b.call(this, d, j.val()) : r = b, null == r ? r = "" : "number" == typeof r ? r += "" : e.isArray(r) && (r = e.map(r, function(b) {
                        return null == b ? "" : b + ""
                    })), n = e.valHooks[this.type] || e.valHooks[this.nodeName.toLowerCase()], !n || !("set" in n) || n.set(this, r, "value") === c)) this.value = r
            });
            if (j) return n = e.valHooks[j.type] || e.valHooks[j.nodeName.toLowerCase()], n && "get" in n && (d = n.get(j,
                "value")) !== c ? d : (d = j.value, "string" == typeof d ? d.replace(Pc, "") : null == d ? "" : d)
        }
    });
    e.extend({
        valHooks: {
            option: {
                get: function(b) {
                    var c = b.attributes.value;
                    return !c || c.specified ? b.value : b.text
                }
            },
            select: {
                get: function(b) {
                    var c, d, B = b.selectedIndex,
                        j = [],
                        f = b.options,
                        t = "select-one" === b.type;
                    if (0 > B) return null;
                    b = t ? B : 0;
                    for (d = t ? B + 1 : f.length; b < d; b++)
                        if (c = f[b], c.selected && (e.support.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !e.nodeName(c.parentNode, "optgroup"))) {
                            c = e(c).val();
                            if (t) return c;
                            j.push(c)
                        }
                    return t && !j.length && f.length ? e(f[B]).val() : j
                },
                set: function(b, c) {
                    var d = e.makeArray(c);
                    return e(b).find("option").each(function() {
                        this.selected = 0 <= e.inArray(e(this).val(), d)
                    }), d.length || (b.selectedIndex = -1), d
                }
            }
        },
        attrFn: {},
        attr: function(b, n, d, B) {
            var j, f, t = b.nodeType;
            if (b && !(3 === t || 8 === t || 2 === t)) {
                if (B && e.isFunction(e.fn[n])) return e(b)[n](d);
                if ("undefined" == typeof b.getAttribute) return e.prop(b, n, d);
                (B = 1 !== t || !e.isXMLDoc(b)) && (n = n.toLowerCase(), f = e.attrHooks[n] || (Ob.test(n) ? Lb :
                    ba));
                if (d !== c) {
                    if (null === d) {
                        e.removeAttr(b, n);
                        return
                    }
                    return f && "set" in f && B && (j = f.set(b, d, n)) !== c ? j : (b.setAttribute(n, d + ""), d)
                }
                return f && "get" in f && B && null !== (j = f.get(b, n)) ? j : (j = b.getAttribute(n), null === j ? c : j)
            }
        },
        removeAttr: function(b, c) {
            var d, B, j, f, t = 0;
            if (c && 1 === b.nodeType)
                for (B = c.split(fa); t < B.length; t++)(j = B[t]) && (d = e.propFix[j] || j, f = Ob.test(j), f || e.attr(b, j, ""), b.removeAttribute(Pb ? j : d), f && d in b && (b[d] = !1))
        },
        attrHooks: {
            type: {
                set: function(b, c) {
                    if (Qc.test(b.nodeName) && b.parentNode) e.error("type property can't be changed");
                    else if (!e.support.radioValue && "radio" === c && e.nodeName(b, "input")) {
                        var d = b.value;
                        return b.setAttribute("type", c), d && (b.value = d), c
                    }
                }
            },
            value: {
                get: function(b, c) {
                    return ba && e.nodeName(b, "button") ? ba.get(b, c) : c in b ? b.value : null
                },
                set: function(b, c, d) {
                    if (ba && e.nodeName(b, "button")) return ba.set(b, c, d);
                    b.value = c
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(b, n, d) {
            var j, f, g, t = b.nodeType;
            if (b && !(3 === t || 8 === t || 2 === t)) return g = 1 !== t || !e.isXMLDoc(b), g && (n = e.propFix[n] || n, f = e.propHooks[n]), d !== c ? f && "set" in f && (j = f.set(b, d, n)) !== c ? j : b[n] = d : f && "get" in f && null !== (j = f.get(b, n)) ? j : b[n]
        },
        propHooks: {
            tabIndex: {
                get: function(b) {
                    var n = b.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : Rc.test(b.nodeName) || Sc.test(b.nodeName) && b.href ? 0 : c
                }
            }
        }
    });
    Lb = {
        get: function(b,
            n) {
            var d, j = e.prop(b, n);
            return !0 === j || "boolean" != typeof j && (d = b.getAttributeNode(n)) && !1 !== d.nodeValue ? n.toLowerCase() : c
        },
        set: function(b, c, d) {
            var j;
            return !1 === c ? e.removeAttr(b, d) : (j = e.propFix[d] || d, j in b && (b[j] = !0), b.setAttribute(d, d.toLowerCase())), d
        }
    };
    Pb || (Mb = {
        name: !0,
        id: !0,
        coords: !0
    }, ba = e.valHooks.button = {
        get: function(b, n) {
            var d;
            return d = b.getAttributeNode(n), d && (Mb[n] ? "" !== d.value : d.specified) ? d.value : c
        },
        set: function(b, c, d) {
            var e = b.getAttributeNode(d);
            return e || (e = C.createAttribute(d), b.setAttributeNode(e)),
                e.value = c + ""
        }
    }, e.each(["width", "height"], function(b, c) {
        e.attrHooks[c] = e.extend(e.attrHooks[c], {
            set: function(b, q) {
                if ("" === q) return b.setAttribute(c, "auto"), q
            }
        })
    }), e.attrHooks.contenteditable = {
        get: ba.get,
        set: function(b, c, d) {
            "" === c && (c = "false");
            ba.set(b, c, d)
        }
    });
    e.support.hrefNormalized || e.each(["href", "src", "width", "height"], function(b, n) {
        e.attrHooks[n] = e.extend(e.attrHooks[n], {
            get: function(b) {
                b = b.getAttribute(n, 2);
                return null === b ? c : b
            }
        })
    });
    e.support.style || (e.attrHooks.style = {
        get: function(b) {
            return b.style.cssText.toLowerCase() ||
                c
        },
        set: function(b, c) {
            return b.style.cssText = c + ""
        }
    });
    e.support.optSelected || (e.propHooks.selected = e.extend(e.propHooks.selected, {
        get: function(b) {
            b = b.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }));
    e.support.enctype || (e.propFix.enctype = "encoding");
    e.support.checkOn || e.each(["radio", "checkbox"], function() {
        e.valHooks[this] = {
            get: function(b) {
                return null === b.getAttribute("value") ? "on" : b.value
            }
        }
    });
    e.each(["radio", "checkbox"], function() {
        e.valHooks[this] = e.extend(e.valHooks[this], {
            set: function(b, c) {
                if (e.isArray(c)) return b.checked = 0 <= e.inArray(e(b).val(), c)
            }
        })
    });
    var eb = /^(?:textarea|input|select)$/i,
        Qb = /^([^\.]*|)(?:\.(.+)|)$/,
        Tc = /(?:^|\s)hover(\.\S+|)\b/,
        Uc = /^key/,
        Vc = /^(?:mouse|contextmenu)|click/,
        Rb = /^(?:focusinfocus|focusoutblur)$/,
        Sb = function(b) {
            return e.event.special.hover ? b : b.replace(Tc, "mouseenter$1 mouseleave$1")
        };
    e.event = {
        add: function(b, n, d, j, f) {
            var g, t, m, l, v, s, Ca, p, y;
            if (!(3 === b.nodeType || 8 === b.nodeType || !n || !d || !(g = e._data(b)))) {
                d.handler && (Ca = d, d = Ca.handler, f = Ca.selector);
                d.guid || (d.guid = e.guid++);
                (m = g.events) || (g.events = m = {});
                (t = g.handle) || (g.handle = t = function(b) {
                    return "undefined" != typeof e && (!b || e.event.triggered !== b.type) ? e.event.dispatch.apply(t.elem, arguments) : c
                }, t.elem = b);
                n = e.trim(Sb(n)).split(" ");
                for (g = 0; g < n.length; g++) {
                    l = Qb.exec(n[g]) || [];
                    v = l[1];
                    s = (l[2] || "").split(".").sort();
                    y = e.event.special[v] || {};
                    v = (f ? y.delegateType : y.bindType) || v;
                    y = e.event.special[v] || {};
                    l = e.extend({
                        type: v,
                        origType: l[1],
                        data: j,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        needsContext: f && e.expr.match.needsContext.test(f),
                        namespace: s.join(".")
                    }, Ca);
                    p = m[v];
                    if (!p && (p = m[v] = [], p.delegateCount = 0, !y.setup || !1 === y.setup.call(b, j, s, t))) b.addEventListener ? b.addEventListener(v, t, !1) : b.attachEvent && b.attachEvent("on" + v, t);
                    y.add && (y.add.call(b, l), l.handler.guid || (l.handler.guid = d.guid));
                    f ? p.splice(p.delegateCount++, 0, l) : p.push(l);
                    e.event.global[v] = !0
                }
                b = null
            }
        },
        global: {},
        remove: function(b, c, d, j, f) {
            var g, t, m, l, v, s, y, p, D, u, x = e.hasData(b) && e._data(b);
            if (x && (y = x.events)) {
                c = e.trim(Sb(c || "")).split(" ");
                for (g = 0; g < c.length; g++)
                    if (t = Qb.exec(c[g]) || [], m = l = t[1], t = t[2], m) {
                        p = e.event.special[m] || {};
                        m = (j ? p.delegateType : p.bindType) || m;
                        D = y[m] || [];
                        v = D.length;
                        t = t ? RegExp("(^|\\.)" + t.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (s = 0; s < D.length; s++) u = D[s], (f || l === u.origType) && (!d || d.guid === u.guid) && (!t || t.test(u.namespace)) && (!j || j === u.selector || "**" === j && u.selector) && (D.splice(s--, 1), u.selector && D.delegateCount--, p.remove && p.remove.call(b, u));
                        0 === D.length && v !== D.length && ((!p.teardown || !1 === p.teardown.call(b, t, x.handle)) && e.removeEvent(b,
                            m, x.handle), delete y[m])
                    } else
                        for (m in y) e.event.remove(b, m + c[g], d, j, !0);
                e.isEmptyObject(y) && (delete x.handle, e.removeData(b, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(q, d, r, j) {
            if (!r || 3 !== r.nodeType && 8 !== r.nodeType) {
                var f, g, t, m, l, v, s, p = q.type || q;
                m = [];
                if (!Rb.test(p + e.event.triggered) && (0 <= p.indexOf("!") && (p = p.slice(0, -1), f = !0), 0 <= p.indexOf(".") && (m = p.split("."), p = m.shift(), m.sort()), r && !e.event.customEvent[p] || e.event.global[p]))
                    if (q = "object" == typeof q ? q[e.expando] ?
                        q : new e.Event(p, q) : new e.Event(p), q.type = p, q.isTrigger = !0, q.exclusive = f, q.namespace = m.join("."), q.namespace_re = q.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, m = 0 > p.indexOf(":") ? "on" + p : "", r) {
                        if (q.result = c, q.target || (q.target = r), d = null != d ? e.makeArray(d) : [], d.unshift(q), l = e.event.special[p] || {}, !(l.trigger && !1 === l.trigger.apply(r, d))) {
                            s = [
                                [r, l.bindType || p]
                            ];
                            if (!j && !l.noBubble && !e.isWindow(r)) {
                                g = l.delegateType || p;
                                f = Rb.test(g + p) ? r : r.parentNode;
                                for (t = r; f; f = f.parentNode) s.push([f, g]),
                                    t = f;
                                t === (r.ownerDocument || C) && s.push([t.defaultView || t.parentWindow || b, g])
                            }
                            for (g = 0; g < s.length && !q.isPropagationStopped(); g++) f = s[g][0], q.type = s[g][1], (v = (e._data(f, "events") || {})[q.type] && e._data(f, "handle")) && v.apply(f, d), (v = m && f[m]) && e.acceptData(f) && v.apply && !1 === v.apply(f, d) && q.preventDefault();
                            return q.type = p, !j && !q.isDefaultPrevented() && (!l._default || !1 === l._default.apply(r.ownerDocument, d)) && ("click" !== p || !e.nodeName(r, "a")) && e.acceptData(r) && m && r[p] && ("focus" !== p && "blur" !== p || 0 !== q.target.offsetWidth) &&
                                !e.isWindow(r) && (t = r[m], t && (r[m] = null), e.event.triggered = p, r[p](), e.event.triggered = c, t && (r[m] = t)), q.result
                        }
                    } else
                        for (g in r = e.cache, r) r[g].events && r[g].events[p] && e.event.trigger(q, d, r[g].handle.elem, !0)
            }
        },
        dispatch: function(q) {
            q = e.event.fix(q || b.event);
            var d, r, j, f, g, t, m = (e._data(this, "events") || {})[q.type] || [],
                l = m.delegateCount,
                v = aa.call(arguments),
                s = !q.exclusive && !q.namespace,
                p = e.event.special[q.type] || {},
                y = [];
            v[0] = q;
            q.delegateTarget = this;
            if (!(p.preDispatch && !1 === p.preDispatch.call(this, q))) {
                if (l &&
                    (!q.button || "click" !== q.type))
                    for (r = q.target; r != this; r = r.parentNode || this)
                        if (!0 !== r.disabled || "click" !== q.type) {
                            f = {};
                            g = [];
                            for (d = 0; d < l; d++) j = m[d], t = j.selector, f[t] === c && (f[t] = j.needsContext ? 0 <= e(t, this).index(r) : e.find(t, this, null, [r]).length), f[t] && g.push(j);
                            g.length && y.push({
                                elem: r,
                                matches: g
                            })
                        }
                m.length > l && y.push({
                    elem: this,
                    matches: m.slice(l)
                });
                for (d = 0; d < y.length && !q.isPropagationStopped(); d++) {
                    f = y[d];
                    q.currentTarget = f.elem;
                    for (r = 0; r < f.matches.length && !q.isImmediatePropagationStopped(); r++)
                        if (j = f.matches[r],
                            s || !q.namespace && !j.namespace || q.namespace_re && q.namespace_re.test(j.namespace)) q.data = j.data, q.handleObj = j, j = ((e.event.special[j.origType] || {}).handle || j.handler).apply(f.elem, v), j !== c && (q.result = j, !1 === j && (q.preventDefault(), q.stopPropagation()))
                }
                return p.postDispatch && p.postDispatch.call(this, q), q.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(b, c) {
                return null == b.which && (b.which = null != c.charCode ? c.charCode : c.keyCode), b
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(b, d) {
                var e, j, f, g = d.button,
                    t = d.fromElement;
                return null == b.pageX && null != d.clientX && (e = b.target.ownerDocument || C, j = e.documentElement, f = e.body, b.pageX = d.clientX + (j && j.scrollLeft || f && f.scrollLeft || 0) - (j && j.clientLeft ||
                    f && f.clientLeft || 0), b.pageY = d.clientY + (j && j.scrollTop || f && f.scrollTop || 0) - (j && j.clientTop || f && f.clientTop || 0)), !b.relatedTarget && t && (b.relatedTarget = t === b.target ? d.toElement : t), !b.which && g !== c && (b.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), b
            }
        },
        fix: function(b) {
            if (b[e.expando]) return b;
            var c, d, j = b,
                f = e.event.fixHooks[b.type] || {},
                g = f.props ? this.props.concat(f.props) : this.props;
            b = e.Event(j);
            for (c = g.length; c;) d = g[--c], b[d] = j[d];
            return b.target || (b.target = j.srcElement || C), 3 === b.target.nodeType && (b.target = b.target.parentNode),
                b.metaKey = !!b.metaKey, f.filter ? f.filter(b, j) : b
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(b, c, d) {
                    e.isWindow(this) && (this.onbeforeunload = d)
                },
                teardown: function(b, c) {
                    this.onbeforeunload === c && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(b, c, d, j) {
            b = e.extend(new e.Event, d, {
                type: b,
                isSimulated: !0,
                originalEvent: {}
            });
            j ? e.event.trigger(b, null, c) : e.event.dispatch.call(c, b);
            b.isDefaultPrevented() && d.preventDefault()
        }
    };
    e.event.handle =
        e.event.dispatch;
    e.removeEvent = C.removeEventListener ? function(b, c, d) {
        b.removeEventListener && b.removeEventListener(c, d, !1)
    } : function(b, c, d) {
        c = "on" + c;
        b.detachEvent && ("undefined" == typeof b[c] && (b[c] = null), b.detachEvent(c, d))
    };
    e.Event = function(b, c) {
        if (this instanceof e.Event) b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented || !1 === b.returnValue || b.getPreventDefault && b.getPreventDefault() ? l : g) : this.type = b, c && e.extend(this, c), this.timeStamp = b && b.timeStamp || e.now(),
            this[e.expando] = !0;
        else return new e.Event(b, c)
    };
    e.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = l;
            var b = this.originalEvent;
            b && (b.preventDefault ? b.preventDefault() : b.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = l;
            var b = this.originalEvent;
            b && (b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = l;
            this.stopPropagation()
        },
        isDefaultPrevented: g,
        isPropagationStopped: g,
        isImmediatePropagationStopped: g
    };
    e.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(b, c) {
        e.event.special[b] = {
            delegateType: c,
            bindType: c,
            handle: function(b) {
                var q, d = b.relatedTarget,
                    j = b.handleObj;
                if (!d || d !== this && !e.contains(this, d)) b.type = j.origType, q = j.handler.apply(this, arguments), b.type = c;
                return q
            }
        }
    });
    e.support.submitBubbles || (e.event.special.submit = {
        setup: function() {
            if (e.nodeName(this, "form")) return !1;
            e.event.add(this, "click._submit keypress._submit", function(b) {
                b = b.target;
                (b = e.nodeName(b, "input") || e.nodeName(b, "button") ?
                    b.form : c) && !e._data(b, "_submit_attached") && (e.event.add(b, "submit._submit", function(b) {
                    b._submit_bubble = !0
                }), e._data(b, "_submit_attached", !0))
            })
        },
        postDispatch: function(b) {
            b._submit_bubble && (delete b._submit_bubble, this.parentNode && !b.isTrigger && e.event.simulate("submit", this.parentNode, b, !0))
        },
        teardown: function() {
            if (e.nodeName(this, "form")) return !1;
            e.event.remove(this, "._submit")
        }
    });
    e.support.changeBubbles || (e.event.special.change = {
        setup: function() {
            if (eb.test(this.nodeName)) {
                if ("checkbox" === this.type ||
                    "radio" === this.type) e.event.add(this, "propertychange._change", function(b) {
                    "checked" === b.originalEvent.propertyName && (this._just_changed = !0)
                }), e.event.add(this, "click._change", function(b) {
                    this._just_changed && !b.isTrigger && (this._just_changed = !1);
                    e.event.simulate("change", this, b, !0)
                });
                return !1
            }
            e.event.add(this, "beforeactivate._change", function(b) {
                b = b.target;
                eb.test(b.nodeName) && !e._data(b, "_change_attached") && (e.event.add(b, "change._change", function(b) {
                    this.parentNode && !b.isSimulated && !b.isTrigger &&
                        e.event.simulate("change", this.parentNode, b, !0)
                }), e._data(b, "_change_attached", !0))
            })
        },
        handle: function(b) {
            var c = b.target;
            if (this !== c || b.isSimulated || b.isTrigger || "radio" !== c.type && "checkbox" !== c.type) return b.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return e.event.remove(this, "._change"), !eb.test(this.nodeName)
        }
    });
    e.support.focusinBubbles || e.each({
        focus: "focusin",
        blur: "focusout"
    }, function(b, c) {
        var d = 0,
            j = function(b) {
                e.event.simulate(c, b.target, e.event.fix(b), !0)
            };
        e.event.special[c] = {
            setup: function() {
                0 === d++ && C.addEventListener(b, j, !0)
            },
            teardown: function() {
                0 === --d && C.removeEventListener(b, j, !0)
            }
        }
    });
    e.fn.extend({
        on: function(b, d, r, j, f) {
            var m, t;
            if ("object" == typeof b) {
                "string" != typeof d && (r = r || d, d = c);
                for (t in b) this.on(t, d, r, b[t], f);
                return this
            }
            null == r && null == j ? (j = d, r = d = c) : null == j && ("string" == typeof d ? (j = r, r = c) : (j = r, r = d, d = c));
            if (!1 === j) j = g;
            else if (!j) return this;
            return 1 === f && (m = j, j = function(b) {
                return e().off(b), m.apply(this, arguments)
            }, j.guid = m.guid || (m.guid = e.guid++)), this.each(function() {
                e.event.add(this, b, j, r, d)
            })
        },
        one: function(b, c, d, e) {
            return this.on(b, c, d, e, 1)
        },
        off: function(b, d, r) {
            var j, f;
            if (b && b.preventDefault && b.handleObj) return j = b.handleObj, e(b.delegateTarget).off(j.namespace ? j.origType + "." + j.namespace : j.origType, j.selector, j.handler), this;
            if ("object" == typeof b) {
                for (f in b) this.off(f, d, b[f]);
                return this
            }
            if (!1 === d || "function" == typeof d) r = d, d = c;
            return !1 === r && (r = g), this.each(function() {
                e.event.remove(this, b, r, d)
            })
        },
        bind: function(b, c, d) {
            return this.on(b, null, c, d)
        },
        unbind: function(b, c) {
            return this.off(b,
                null, c)
        },
        live: function(b, c, d) {
            return e(this.context).on(b, this.selector, c, d), this
        },
        die: function(b, c) {
            return e(this.context).off(b, this.selector || "**", c), this
        },
        delegate: function(b, c, d, e) {
            return this.on(c, b, d, e)
        },
        undelegate: function(b, c, d) {
            return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", d)
        },
        trigger: function(b, c) {
            return this.each(function() {
                e.event.trigger(b, c, this)
            })
        },
        triggerHandler: function(b, c) {
            if (this[0]) return e.event.trigger(b, c, this[0], !0)
        },
        toggle: function(b) {
            var c = arguments,
                d =
                b.guid || e.guid++,
                j = 0,
                f = function(d) {
                    var r = (e._data(this, "lastToggle" + b.guid) || 0) % j;
                    return e._data(this, "lastToggle" + b.guid, r + 1), d.preventDefault(), c[r].apply(this, arguments) || !1
                };
            for (f.guid = d; j < c.length;) c[j++].guid = d;
            return this.click(f)
        },
        hover: function(b, c) {
            return this.mouseenter(b).mouseleave(c || b)
        }
    });
    e.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function(b, c) {
            e.fn[c] = function(b, q) {
                return null == q && (q = b, b = null), 0 < arguments.length ? this.on(c, null, b, q) : this.trigger(c)
            };
            Uc.test(c) && (e.event.fixHooks[c] = e.event.keyHooks);
            Vc.test(c) && (e.event.fixHooks[c] = e.event.mouseHooks)
        });
		
    var Wc = b,
        G = function(b, c, d, e) {
            d = d || [];
            c = c || X;
            var j, f, t, g, m = c.nodeType;
            if (!b || "string" != typeof b) return d;
            if (1 !== m && 9 !== m) return [];
            t = La(c);
            if (!t && !e && (j = Xc.exec(b)))
                if (g = j[1])
                    if (9 === m) {
                        f = c.getElementById(g);
                        if (!f || !f.parentNode) return d;
                        if (f.id === g) return d.push(f), d
                    } else {
                        if (c.ownerDocument &&
                            (f = c.ownerDocument.getElementById(g)) && Tb(c, f) && f.id === g) return d.push(f), d
                    }
            else {
                if (j[2]) return oa.apply(d, pa.call(c.getElementsByTagName(b), 0)), d;
                if ((g = j[3]) && Ub && c.getElementsByClassName) return oa.apply(d, pa.call(c.getElementsByClassName(g), 0)), d
            }
            return fb(b.replace(Ma, "$1"), c, d, e, t)
        },
        va = function(b) {
            return function(c) {
                return "input" === c.nodeName.toLowerCase() && c.type === b
            }
        },
        Vb = function(b) {
            return function(c) {
                var d = c.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && c.type === b
            }
        },
        ia = function(b) {
            return Y(function(c) {
                return c = +c, Y(function(d, e) {
                    for (var j, f = b([], d.length, c), t = f.length; t--;) d[j = f[t]] && (d[j] = !(e[j] = d[j]))
                })
            })
        },
        Na = function(b, c, d) {
            if (b === c) return d;
            for (b = b.nextSibling; b;) {
                if (b === c) return -1;
                b = b.nextSibling
            }
            return 1
        },
        Pa = function(b, c) {
            var d, e, j, f, t, g, m;
            if (t = Wb[I][b]) return c ? 0 : t.slice(0);
            t = b;
            g = [];
            for (m = L.preFilter; t;) {
                if (!d || (e = Yc.exec(t))) e && (t = t.slice(e[0].length)), g.push(j = []);
                d = !1;
                if (e = Zc.exec(t)) j.push(d = new Xb(e.shift())), t = t.slice(d.length), d.type = e[0].replace(Ma, " ");
                for (f in L.filter)(e = Oa[f].exec(t)) &&
                    (!m[f] || (e = m[f](e, X, !0))) && (j.push(d = new Xb(e.shift())), t = t.slice(d.length), d.type = f, d.matches = e);
                if (!d) break
            }
            return c ? t.length : t ? G.error(b) : Wb(b, g).slice(0)
        },
        hb = function(b, c, d) {
            var e = c.dir,
                j = d && "parentNode" === c.dir,
                f = $c++;
            return c.first ? function(c, d, n) {
                for (; c = c[e];)
                    if (j || 1 === c.nodeType) return b(c, d, n)
            } : function(c, d, n) {
                if (n)
                    for (; c = c[e];) {
                        if ((j || 1 === c.nodeType) && b(c, d, n)) return c
                    } else
                        for (var r, g = wa + " " + f + " ", m = g + gb; c = c[e];)
                            if (j || 1 === c.nodeType) {
                                if ((r = c[I]) === m) return c.sizset;
                                if ("string" == typeof r &&
                                    0 === r.indexOf(g)) {
                                    if (c.sizset) return c
                                } else {
                                    c[I] = m;
                                    if (b(c, d, n)) return c.sizset = !0, c;
                                    c.sizset = !1
                                }
                            }
            }
        },
        ib = function(b) {
            return 1 < b.length ? function(c, d, e) {
                for (var j = b.length; j--;)
                    if (!b[j](c, d, e)) return !1;
                return !0
            } : b[0]
        },
        Qa = function(b, c, d, e, j) {
            for (var f, g = [], m = 0, l = b.length, v = null != c; m < l; m++)
                if (f = b[m])
                    if (!d || d(f, e, j)) g.push(f), v && c.push(m);
            return g
        },
        jb = function(b, c, d, e, j, f) {
            return e && !e[I] && (e = jb(e)), j && !j[I] && (j = jb(j, f)), Y(function(f, g, m, l) {
                if (!f || !j) {
                    var A, v, s = [],
                        p = [],
                        y = g.length;
                    if (!(v = f)) {
                        v = c || "*";
                        var D =
                            m.nodeType ? [m] : m,
                            u = [];
                        A = 0;
                        for (var x = D.length; A < x; A++) G(v, D[A], u, f);
                        v = u
                    }
                    D = b && (f || !c) ? Qa(v, s, b, m, l) : v;
                    u = d ? j || (f ? b : y || e) ? [] : g : D;
                    d && d(D, u, m, l);
                    if (e) {
                        v = Qa(u, p);
                        e(v, [], m, l);
                        for (m = v.length; m--;)
                            if (A = v[m]) u[p[m]] = !(D[p[m]] = A)
                    }
                    if (f)
                        for (m = b && u.length; m--;) {
                            if (A = u[m]) f[s[m]] = !(g[s[m]] = A)
                        } else u = Qa(u === g ? u.splice(y, u.length) : u), j ? j(null, g, u, l) : oa.apply(g, u)
                }
            })
        },
        kb = function(b) {
            var c, d, e, j = b.length,
                f = L.relative[b[0].type];
            d = f || L.relative[" "];
            for (var g = f ? 1 : 0, m = hb(function(b) {
                    return b === c
                }, d, !0), l = hb(function(b) {
                    return -1 <
                        Yb.call(c, b)
                }, d, !0), v = [function(b, d, q) {
                    return !f && (q || d !== Ra) || ((c = d).nodeType ? m(b, d, q) : l(b, d, q))
                }]; g < j; g++)
                if (d = L.relative[b[g].type]) v = [hb(ib(v), d)];
                else {
                    d = L.filter[b[g].type].apply(null, b[g].matches);
                    if (d[I]) {
                        for (e = ++g; e < j && !L.relative[b[e].type]; e++);
                        return jb(1 < g && ib(v), 1 < g && b.slice(0, g - 1).join("").replace(Ma, "$1"), d, g < e && kb(b.slice(g, e)), e < j && kb(b = b.slice(e)), e < j && b.join(""))
                    }
                    v.push(d)
                }
            return ib(v)
        },
        fb = function(b, c, d, e, j) {
            var f, g, m, l, v = Pa(b);
            if (!e && 1 === v.length) {
                g = v[0] = v[0].slice(0);
                if (2 < g.length &&
                    "ID" === (m = g[0]).type && 9 === c.nodeType && !j && L.relative[g[1].type]) {
                    c = L.find.ID(m.matches[0].replace(ja, ""), c, j)[0];
                    if (!c) return d;
                    b = b.slice(g.shift().length)
                }
                for (f = Oa.POS.test(b) ? -1 : g.length - 1; 0 <= f; f--) {
                    m = g[f];
                    if (L.relative[l = m.type]) break;
                    if (l = L.find[l])
                        if (e = l(m.matches[0].replace(ja, ""), lb.test(g[0].type) && c.parentNode || c, j)) {
                            g.splice(f, 1);
                            b = e.length && g.join("");
                            if (!b) return oa.apply(d, pa.call(e, 0)), d;
                            break
                        }
                }
            }
            return mb(b, v)(e, c, j, d, lb.test(b)), d
        },
        Zb = function() {},
        gb, nb, L, Sa, La, Tb, mb, ob, xa, Ra, $b = !0,
        I = ("sizcache" + Math.random()).replace(".", ""),
        Xb = String,
        X = Wc.document,
        W = X.documentElement,
        wa = 0,
        $c = 0,
        ad = [].pop,
        oa = [].push,
        pa = [].slice,
        Yb = [].indexOf || function(b) {
            for (var c = 0, d = this.length; c < d; c++)
                if (this[c] === b) return c;
            return -1
        },
        Y = function(b, c) {
            return b[I] = null == c || c, b
        },
        pb = function() {
            var b = {},
                c = [];
            return Y(function(d, e) {
                return c.push(d) > L.cacheLength && delete b[c.shift()], b[d] = e
            }, b)
        },
        ac = pb(),
        Wb = pb(),
        bc = pb(),
        cc = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
        "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
        qb = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + cc + ")|[^:]|\\\\.)*|.*))\\)|)",
        Ma = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        Yc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
        Zc = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
        bd = RegExp(qb),
        Xc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        lb = /[\x20\t\r\n\f]*[+~]/,
        cd = /h\d/i,
        dd = /input|select|textarea|button/i,
        ja = /\\(?!\\)/g,
        Oa = {
            ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
            TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
            ATTR: RegExp("^" + cc),
            PSEUDO: RegExp("^" + qb),
            POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
            CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
                "i"),
            needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
        },
        ca = function(b) {
            var c = X.createElement("div");
            try {
                return b(c)
            } catch (d) {
                return !1
            } finally {}
        },
        ed = ca(function(b) {
            return b.appendChild(X.createComment("")), !b.getElementsByTagName("*").length
        }),
        fd = ca(function(b) {
            return b.innerHTML = "<a href='#'></a>", b.firstChild && "undefined" !== typeof b.firstChild.getAttribute && "#" === b.firstChild.getAttribute("href")
        }),
        gd = ca(function(b) {
            b.innerHTML = "<select></select>";
            b = typeof b.lastChild.getAttribute("multiple");
            return "boolean" !== b && "string" !== b
        }),
        Ub = ca(function(b) {
            return b.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !b.getElementsByClassName || !b.getElementsByClassName("e").length ? !1 : (b.lastChild.className = "e", 2 === b.getElementsByClassName("e").length)
        }),
        hd = ca(function(b) {
            b.id = I + 0;
            b.innerHTML = "<a name='" + I + "'></a><div name='" + I + "'></div>";
            W.insertBefore(b, W.firstChild);
            var c = X.getElementsByName &&
                X.getElementsByName(I).length === 2 + X.getElementsByName(I + 0).length;
            return nb = !X.getElementById(I), W.removeChild(b), c
        });
    try {
        pa.call(W.childNodes, 0)[0].nodeType
    } catch (Rd) {
        pa = function(b) {
            for (var c, d = []; c = this[b]; b++) d.push(c);
            return d
        }
    }
    G.matches = function(b, c) {
        return G(b, null, null, c)
    };
    G.matchesSelector = function(b, c) {
        return 0 < G(c, null, null, [b]).length
    };
    Sa = G.getText = function(b) {
        var c, d = "",
            e = 0;
        if (c = b.nodeType)
            if (1 === c || 9 === c || 11 === c) {
                if ("string" == typeof b.textContent) return b.textContent;
                for (b = b.firstChild; b; b =
                    b.nextSibling) d += Sa(b)
            } else {
                if (3 === c || 4 === c) return b.nodeValue
            }
        else
            for (; c = b[e]; e++) d += Sa(c);
        return d
    };
    La = G.isXML = function(b) {
        return (b = b && (b.ownerDocument || b).documentElement) ? "HTML" !== b.nodeName : !1
    };
    Tb = G.contains = W.contains ? function(b, c) {
        var d = 9 === b.nodeType ? b.documentElement : b,
            e = c && c.parentNode;
        return b === e || !(!e || !(1 === e.nodeType && d.contains && d.contains(e)))
    } : W.compareDocumentPosition ? function(b, c) {
        return c && !!(b.compareDocumentPosition(c) & 16)
    } : function(b, c) {
        for (; c = c.parentNode;)
            if (c === b) return !0;
        return !1
    };
    G.attr = function(b, c) {
        var d, e = La(b);
        return e || (c = c.toLowerCase()), (d = L.attrHandle[c]) ? d(b) : e || gd ? b.getAttribute(c) : (d = b.getAttributeNode(c), d ? "boolean" == typeof b[c] ? b[c] ? c : null : d.specified ? d.value : null : null)
    };
    L = G.selectors = {
        cacheLength: 50,
        createPseudo: Y,
        match: Oa,
        attrHandle: fd ? {} : {
            href: function(b) {
                return b.getAttribute("href", 2)
            },
            type: function(b) {
                return b.getAttribute("type")
            }
        },
        find: {
            ID: nb ? function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (b = c.getElementById(b)) && b.parentNode ? [b] : []
            } : function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (c = c.getElementById(b)) ? c.id === b || "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id").value === b ? [c] : void 0 : []
            },
            TAG: ed ? function(b, c) {
                if ("undefined" !== typeof c.getElementsByTagName) return c.getElementsByTagName(b)
            } : function(b, c) {
                var d = c.getElementsByTagName(b);
                if ("*" === b) {
                    for (var e, j = [], f = 0; e = d[f]; f++) 1 === e.nodeType && j.push(e);
                    return j
                }
                return d
            },
            NAME: hd && function(b, c) {
                if ("undefined" !== typeof c.getElementsByName) return c.getElementsByName(name)
            },
            CLASS: Ub && function(b, c, d) {
                if ("undefined" !== typeof c.getElementsByClassName && !d) return c.getElementsByClassName(b)
            }
        },
        relative: {
            ">": {
                dir: "parentNode",
                first: !0
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: !0
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            ATTR: function(b) {
                return b[1] = b[1].replace(ja, ""), b[3] = (b[4] || b[5] || "").replace(ja, ""), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
            },
            CHILD: function(b) {
                return b[1] = b[1].toLowerCase(), "nth" === b[1] ? (b[2] || G.error(b[0]), b[3] = +(b[3] ? b[4] + (b[5] || 1) :
                    2 * ("even" === b[2] || "odd" === b[2])), b[4] = +(b[6] + b[7] || "odd" === b[2])) : b[2] && G.error(b[0]), b
            },
            PSEUDO: function(b) {
                var c, d;
                if (Oa.CHILD.test(b[0])) return null;
                if (b[3]) b[2] = b[3];
                else if (c = b[4]) bd.test(c) && (d = Pa(c, !0)) && (d = c.indexOf(")", c.length - d) - c.length) && (c = c.slice(0, d), b[0] = b[0].slice(0, d)), b[2] = c;
                return b.slice(0, 3)
            }
        },
        filter: {
            ID: nb ? function(b) {
                return b = b.replace(ja, ""),
                    function(c) {
                        return c.getAttribute("id") === b
                    }
            } : function(b) {
                return b = b.replace(ja, ""),
                    function(c) {
                        return (c = "undefined" !== typeof c.getAttributeNode &&
                            c.getAttributeNode("id")) && c.value === b
                    }
            },
            TAG: function(b) {
                return "*" === b ? function() {
                    return !0
                } : (b = b.replace(ja, "").toLowerCase(), function(c) {
                    return c.nodeName && c.nodeName.toLowerCase() === b
                })
            },
            CLASS: function(b) {
                var c = ac[I][b];
                return c || (c = ac(b, RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)"))),
                    function(b) {
                        return c.test(b.className || "undefined" !== typeof b.getAttribute && b.getAttribute("class") || "")
                    }
            },
            ATTR: function(b, c, d) {
                return function(e) {
                    e = G.attr(e, b);
                    return null == e ? "!=" === c : c ? (e += "", "=" ===
                        c ? e === d : "!=" === c ? e !== d : "^=" === c ? d && 0 === e.indexOf(d) : "*=" === c ? d && -1 < e.indexOf(d) : "$=" === c ? d && e.substr(e.length - d.length) === d : "~=" === c ? -1 < (" " + e + " ").indexOf(d) : "|=" === c ? e === d || e.substr(0, d.length + 1) === d + "-" : !1) : !0
                }
            },
            CHILD: function(b, c, d, e) {
                return "nth" === b ? function(b) {
                    var c, q;
                    c = b.parentNode;
                    if (1 === d && 0 === e) return !0;
                    if (c) {
                        q = 0;
                        for (c = c.firstChild; c && !(1 === c.nodeType && (q++, b === c)); c = c.nextSibling);
                    }
                    return q -= e, q === d || 0 === q % d && 0 <= q / d
                } : function(c) {
                    var d = c;
                    switch (b) {
                        case "only":
                        case "first":
                            for (; d = d.previousSibling;)
                                if (1 ===
                                    d.nodeType) return !1;
                            if ("first" === b) return !0;
                            d = c;
                        case "last":
                            for (; d = d.nextSibling;)
                                if (1 === d.nodeType) return !1;
                            return !0
                    }
                }
            },
            PSEUDO: function(b, c) {
                var d, e = L.pseudos[b] || L.setFilters[b.toLowerCase()] || G.error("unsupported pseudo: " + b);
                return e[I] ? e(c) : 1 < e.length ? (d = [b, b, "", c], L.setFilters.hasOwnProperty(b.toLowerCase()) ? Y(function(b, d) {
                    for (var q, j = e(b, c), f = j.length; f--;) q = Yb.call(b, j[f]), b[q] = !(d[q] = j[f])
                }) : function(b) {
                    return e(b, 0, d)
                }) : e
            }
        },
        pseudos: {
            not: Y(function(b) {
                var c = [],
                    d = [],
                    e = mb(b.replace(Ma, "$1"));
                return e[I] ? Y(function(b, c, d, q) {
                    q = e(b, null, q, []);
                    for (var n = b.length; n--;)
                        if (d = q[n]) b[n] = !(c[n] = d)
                }) : function(b, q, j) {
                    return c[0] = b, e(c, null, j, d), !d.pop()
                }
            }),
            has: Y(function(b) {
                return function(c) {
                    return 0 < G(b, c).length
                }
            }),
            contains: Y(function(b) {
                return function(c) {
                    return -1 < (c.textContent || c.innerText || Sa(c)).indexOf(b)
                }
            }),
            enabled: function(b) {
                return !1 === b.disabled
            },
            disabled: function(b) {
                return !0 === b.disabled
            },
            checked: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && !!b.checked || "option" ===
                    c && !!b.selected
            },
            selected: function(b) {
                return b.parentNode && b.parentNode.selectedIndex, !0 === b.selected
            },
            parent: function(b) {
                return !L.pseudos.empty(b)
            },
            empty: function(b) {
                var c;
                for (b = b.firstChild; b;) {
                    if ("@" < b.nodeName || 3 === (c = b.nodeType) || 4 === c) return !1;
                    b = b.nextSibling
                }
                return !0
            },
            header: function(b) {
                return cd.test(b.nodeName)
            },
            text: function(b) {
                var c, d;
                return "input" === b.nodeName.toLowerCase() && "text" === (c = b.type) && (null == (d = b.getAttribute("type")) || d.toLowerCase() === c)
            },
            radio: va("radio"),
            checkbox: va("checkbox"),
            file: va("file"),
            password: va("password"),
            image: va("image"),
            submit: Vb("submit"),
            reset: Vb("reset"),
            button: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && "button" === b.type || "button" === c
            },
            input: function(b) {
                return dd.test(b.nodeName)
            },
            focus: function(b) {
                var c = b.ownerDocument;
                return b === c.activeElement && (!c.hasFocus || c.hasFocus()) && (!!b.type || !!b.href)
            },
            active: function(b) {
                return b === b.ownerDocument.activeElement
            },
            first: ia(function() {
                return [0]
            }),
            last: ia(function(b, c) {
                return [c - 1]
            }),
            eq: ia(function(b,
                c, d) {
                return [0 > d ? d + c : d]
            }),
            even: ia(function(b, c) {
                for (var d = 0; d < c; d += 2) b.push(d);
                return b
            }),
            odd: ia(function(b, c) {
                for (var d = 1; d < c; d += 2) b.push(d);
                return b
            }),
            lt: ia(function(b, c, d) {
                for (c = 0 > d ? d + c : d; 0 <= --c;) b.push(c);
                return b
            }),
            gt: ia(function(b, c, d) {
                for (d = 0 > d ? d + c : d; ++d < c;) b.push(d);
                return b
            })
        }
    };
    ob = W.compareDocumentPosition ? function(b, c) {
        return b === c ? (xa = !0, 0) : (!b.compareDocumentPosition || !c.compareDocumentPosition ? b.compareDocumentPosition : b.compareDocumentPosition(c) & 4) ? -1 : 1
    } : function(b, c) {
        if (b === c) return xa = !0, 0;
        if (b.sourceIndex && c.sourceIndex) return b.sourceIndex - c.sourceIndex;
        var d, e, j = [],
            f = [];
        d = b.parentNode;
        e = c.parentNode;
        var g = d;
        if (d === e) return Na(b, c);
        if (!d) return -1;
        if (!e) return 1;
        for (; g;) j.unshift(g), g = g.parentNode;
        for (g = e; g;) f.unshift(g), g = g.parentNode;
        d = j.length;
        e = f.length;
        for (g = 0; g < d && g < e; g++)
            if (j[g] !== f[g]) return Na(j[g], f[g]);
        return g === d ? Na(b, f[g], -1) : Na(j[g], c, 1)
    };
    [0, 0].sort(ob);
    $b = !xa;
    G.uniqueSort = function(b) {
        var c, d = 1;
        xa = $b;
        b.sort(ob);
        if (xa)
            for (; c = b[d]; d++) c === b[d - 1] && b.splice(d--, 1);
        return b
    };
    G.error = function(b) {
        throw Error("Syntax error, unrecognized expression: " + b);
    };
    mb = G.compile = function(b, c) {
        var d, e = [],
            j = [],
            f = bc[I][b];
        if (!f) {
            c || (c = Pa(b));
            for (d = c.length; d--;) f = kb(c[d]), f[I] ? e.push(f) : j.push(f);
            var g = 0 < e.length,
                m = 0 < j.length,
                l = function(b, c, d, q, n) {
                    var f, r, v = [],
                        A = 0,
                        s = "0",
                        p = b && [],
                        y = null != n,
                        u = Ra,
                        D = b || m && L.find.TAG("*", n && c.parentNode || c),
                        x = wa += null == u ? 1 : Math.E;
                    for (y && (Ra = c !== X && c, gb = l.el); null != (n = D[s]); s++) {
                        if (m && n) {
                            for (f = 0; r = j[f]; f++)
                                if (r(n, c, d)) {
                                    q.push(n);
                                    break
                                }
                            y && (wa = x, gb =
                                ++l.el)
                        }
                        g && ((n = !r && n) && A--, b && p.push(n))
                    }
                    A += s;
                    if (g && s !== A) {
                        for (f = 0; r = e[f]; f++) r(p, v, c, d);
                        if (b) {
                            if (0 < A)
                                for (; s--;) !p[s] && !v[s] && (v[s] = ad.call(q));
                            v = Qa(v)
                        }
                        oa.apply(q, v);
                        y && !b && 0 < v.length && 1 < A + e.length && G.uniqueSort(q)
                    }
                    return y && (wa = x, Ra = u), p
                };
            d = (l.el = 0, g ? Y(l) : l);
            f = bc(b, d)
        }
        return f
    };
    if (X.querySelectorAll) {
        var dc, id = fb,
            jd = /'|\\/g,
            kd = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            Z = [":focus"],
            Ta = [":active", ":focus"],
            Ua = W.matchesSelector || W.mozMatchesSelector || W.webkitMatchesSelector || W.oMatchesSelector ||
            W.msMatchesSelector;
        ca(function(b) {
            b.innerHTML = "<select><option selected=''></option></select>";
            b.querySelectorAll("[selected]").length || Z.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
            b.querySelectorAll(":checked").length || Z.push(":checked")
        });
        ca(function(b) {
            b.innerHTML = "<p test=''></p>";
            b.querySelectorAll("[test^='']").length && Z.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
            b.innerHTML = "<input type='hidden'/>";
            b.querySelectorAll(":enabled").length || Z.push(":enabled",
                ":disabled")
        });
        Z = RegExp(Z.join("|"));
        fb = function(b, c, d, e, j) {
            if (!e && !j && (!Z || !Z.test(b))) {
                var f, g, m = !0,
                    l = I;
                g = c;
                f = 9 === c.nodeType && b;
                if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                    f = Pa(b);
                    (m = c.getAttribute("id")) ? l = m.replace(jd, "\\$&"): c.setAttribute("id", l);
                    l = "[id='" + l + "'] ";
                    for (g = f.length; g--;) f[g] = l + f[g].join("");
                    g = lb.test(b) && c.parentNode || c;
                    f = f.join(",")
                }
                if (f) try {
                    return oa.apply(d, pa.call(g.querySelectorAll(f), 0)), d
                } catch (v) {} finally {
                    m || c.removeAttribute("id")
                }
            }
            return id(b, c, d, e, j)
        };
        Ua &&
            (ca(function(b) {
                dc = Ua.call(b, "div");
                try {
                    Ua.call(b, "[test!='']:sizzle"), Ta.push("!=", qb)
                } catch (c) {}
            }), Ta = RegExp(Ta.join("|")), G.matchesSelector = function(b, c) {
                c = c.replace(kd, "='$1']");
                if (!La(b) && !Ta.test(c) && (!Z || !Z.test(c))) try {
                    var d = Ua.call(b, c);
                    if (d || dc || b.document && 11 !== b.document.nodeType) return d
                } catch (e) {}
                return 0 < G(c, null, null, [b]).length
            })
    }
    L.pseudos.nth = L.pseudos.eq;
    L.filters = Zb.prototype = L.pseudos;
    L.setFilters = new Zb;
    G.attr = e.attr;
    e.find = G;
    e.expr = G.selectors;
    e.expr[":"] = e.expr.pseudos;
    e.unique =
        G.uniqueSort;
    e.text = G.getText;
    e.isXMLDoc = G.isXML;
    e.contains = G.contains;
    var ld = /Until$/,
        md = /^(?:parents|prev(?:Until|All))/,
        vc = /^.[^:#\[\.,]*$/,
        ec = e.expr.match.needsContext,
        nd = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    e.fn.extend({
        find: function(b) {
            var c, d, j, f, g, m, l = this;
            if ("string" != typeof b) return e(b).filter(function() {
                c = 0;
                for (d = l.length; c < d; c++)
                    if (e.contains(l[c], this)) return !0
            });
            m = this.pushStack("", "find", b);
            c = 0;
            for (d = this.length; c < d; c++)
                if (j = m.length, e.find(b, this[c], m), 0 < c)
                    for (f = j; f < m.length; f++)
                        for (g =
                            0; g < j; g++)
                            if (m[g] === m[f]) {
                                m.splice(f--, 1);
                                break
                            }
            return m
        },
        has: function(b) {
            var c, d = e(b, this),
                j = d.length;
            return this.filter(function() {
                for (c = 0; c < j; c++)
                    if (e.contains(this, d[c])) return !0
            })
        },
        not: function(b) {
            return this.pushStack(s(this, b, !1), "not", b)
        },
        filter: function(b) {
            return this.pushStack(s(this, b, !0), "filter", b)
        },
        is: function(b) {
            return !!b && ("string" == typeof b ? ec.test(b) ? 0 <= e(b, this.context).index(this[0]) : 0 < e.filter(b, this).length : 0 < this.filter(b).length)
        },
        closest: function(b, c) {
            for (var d, j = 0, f = this.length,
                    g = [], m = ec.test(b) || "string" != typeof b ? e(b, c || this.context) : 0; j < f; j++)
                for (d = this[j]; d && d.ownerDocument && d !== c && 11 !== d.nodeType;) {
                    if (m ? -1 < m.index(d) : e.find.matchesSelector(d, b)) {
                        g.push(d);
                        break
                    }
                    d = d.parentNode
                }
            return g = 1 < g.length ? e.unique(g) : g, this.pushStack(g, "closest", b)
        },
        index: function(b) {
            return b ? "string" == typeof b ? e.inArray(this[0], e(b)) : e.inArray(b.jquery ? b[0] : b, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(b, c) {
            var d = "string" == typeof b ? e(b, c) : e.makeArray(b && b.nodeType ? [b] : b),
                j = e.merge(this.get(), d);
            return this.pushStack(p(d[0]) || p(j[0]) ? j : e.unique(j))
        },
        addBack: function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }
    });
    e.fn.andSelf = e.fn.addBack;
    e.each({
        parent: function(b) {
            return (b = b.parentNode) && 11 !== b.nodeType ? b : null
        },
        parents: function(b) {
            return e.dir(b, "parentNode")
        },
        parentsUntil: function(b, c, d) {
            return e.dir(b, "parentNode", d)
        },
        next: function(b) {
            return x(b, "nextSibling")
        },
        prev: function(b) {
            return x(b, "previousSibling")
        },
        nextAll: function(b) {
            return e.dir(b,
                "nextSibling")
        },
        prevAll: function(b) {
            return e.dir(b, "previousSibling")
        },
        nextUntil: function(b, c, d) {
            return e.dir(b, "nextSibling", d)
        },
        prevUntil: function(b, c, d) {
            return e.dir(b, "previousSibling", d)
        },
        siblings: function(b) {
            return e.sibling((b.parentNode || {}).firstChild, b)
        },
        children: function(b) {
            return e.sibling(b.firstChild)
        },
        contents: function(b) {
            return e.nodeName(b, "iframe") ? b.contentDocument || b.contentWindow.document : e.merge([], b.childNodes)
        }
    }, function(b, c) {
        e.fn[b] = function(d, j) {
            var f = e.map(this, c, d);
            return ld.test(b) ||
                (j = d), j && "string" == typeof j && (f = e.filter(j, f)), f = 1 < this.length && !nd[b] ? e.unique(f) : f, 1 < this.length && md.test(b) && (f = f.reverse()), this.pushStack(f, b, aa.call(arguments).join(","))
        }
    });
    e.extend({
        filter: function(b, c, d) {
            return d && (b = ":not(" + b + ")"), 1 === c.length ? e.find.matchesSelector(c[0], b) ? [c[0]] : [] : e.find.matches(b, c)
        },
        dir: function(b, d, j) {
            var f = [];
            for (b = b[d]; b && 9 !== b.nodeType && (j === c || 1 !== b.nodeType || !e(b).is(j));) 1 === b.nodeType && f.push(b), b = b[d];
            return f
        },
        sibling: function(b, c) {
            for (var d = []; b; b = b.nextSibling) 1 ===
                b.nodeType && b !== c && d.push(b);
            return d
        }
    });
    var xb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        od = / jQuery\d+="(?:null|\d+)"/g,
        rb = /^\s+/,
        fc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        gc = /<([\w:]+)/,
        pd = /<tbody/i,
        qd = /<|&#?\w+;/,
        rd = /<(?:script|style|link)/i,
        sd = /<(?:script|object|embed|option|style)/i,
        sb = RegExp("<(?:" + xb + ")[\\s/>]", "i"),
        yb = /^(?:checkbox|radio)$/,
        hc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        td = /\/(java|ecma)script/i,
        ud = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        V = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        ic = y(C),
        tb = ic.appendChild(C.createElement("div"));
    V.optgroup =
        V.option;
    V.tbody = V.tfoot = V.colgroup = V.caption = V.thead;
    V.th = V.td;
    e.support.htmlSerialize || (V._default = [1, "X<div>", "</div>"]);
    e.fn.extend({
        text: function(b) {
            return e.access(this, function(b) {
                return b === c ? e.text(this) : this.empty().append((this[0] && this[0].ownerDocument || C).createTextNode(b))
            }, null, b, arguments.length)
        },
        wrapAll: function(b) {
            if (e.isFunction(b)) return this.each(function(c) {
                e(this).wrapAll(b.call(this, c))
            });
            if (this[0]) {
                var c = e(b, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && c.insertBefore(this[0]);
                c.map(function() {
                    for (var b = this; b.firstChild && 1 === b.firstChild.nodeType;) b = b.firstChild;
                    return b
                }).append(this)
            }
            return this
        },
        wrapInner: function(b) {
            return e.isFunction(b) ? this.each(function(c) {
                e(this).wrapInner(b.call(this, c))
            }) : this.each(function() {
                var c = e(this),
                    d = c.contents();
                d.length ? d.wrapAll(b) : c.append(b)
            })
        },
        wrap: function(b) {
            var c = e.isFunction(b);
            return this.each(function(d) {
                e(this).wrapAll(c ? b.call(this, d) : b)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                e.nodeName(this, "body") ||
                    e(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(b)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(b, this.firstChild)
            })
        },
        before: function() {
            if (!p(this[0])) return this.domManip(arguments, !1, function(b) {
                this.parentNode.insertBefore(b, this)
            });
            if (arguments.length) {
                var b = e.clean(arguments);
                return this.pushStack(e.merge(b,
                    this), "before", this.selector)
            }
        },
        after: function() {
            if (!p(this[0])) return this.domManip(arguments, !1, function(b) {
                this.parentNode.insertBefore(b, this.nextSibling)
            });
            if (arguments.length) {
                var b = e.clean(arguments);
                return this.pushStack(e.merge(this, b), "after", this.selector)
            }
        },
        remove: function(b, c) {
            for (var d, j = 0; null != (d = this[j]); j++)
                if (!b || e.filter(b, [d]).length) !c && 1 === d.nodeType && (e.cleanData(d.getElementsByTagName("*")), e.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var b,
                    c = 0; null != (b = this[c]); c++)
                for (1 === b.nodeType && e.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function(b, c) {
            return b = null == b ? !1 : b, c = null == c ? b : c, this.map(function() {
                return e.clone(this, b, c)
            })
        },
        html: function(b) {
            return e.access(this, function(b) {
                var d = this[0] || {},
                    j = 0,
                    q = this.length;
                if (b === c) return 1 === d.nodeType ? d.innerHTML.replace(od, "") : c;
                if ("string" == typeof b && !rd.test(b) && (e.support.htmlSerialize || !sb.test(b)) && (e.support.leadingWhitespace || !rb.test(b)) &&
                    !V[(gc.exec(b) || ["", ""])[1].toLowerCase()]) {
                    b = b.replace(fc, "<$1></$2>");
                    try {
                        for (; j < q; j++) d = this[j] || {}, 1 === d.nodeType && (e.cleanData(d.getElementsByTagName("*")), d.innerHTML = b);
                        d = 0
                    } catch (f) {}
                }
                d && this.empty().append(b)
            }, null, b, arguments.length)
        },
        replaceWith: function(b) {
            return p(this[0]) ? this.length ? this.pushStack(e(e.isFunction(b) ? b() : b), "replaceWith", b) : this : e.isFunction(b) ? this.each(function(c) {
                var d = e(this),
                    j = d.html();
                d.replaceWith(b.call(this, c, j))
            }) : ("string" != typeof b && (b = e(b).detach()), this.each(function() {
                var c =
                    this.nextSibling,
                    d = this.parentNode;
                e(this).remove();
                c ? e(c).before(b) : e(d).append(b)
            }))
        },
        detach: function(b) {
            return this.remove(b, !0)
        },
        domManip: function(b, d, j) {
            b = [].concat.apply([], b);
            var f, g, m, t = 0,
                l = b[0],
                v = [],
                s = this.length;
            if (!e.support.checkClone && 1 < s && "string" == typeof l && hc.test(l)) return this.each(function() {
                e(this).domManip(b, d, j)
            });
            if (e.isFunction(l)) return this.each(function(f) {
                var g = e(this);
                b[0] = l.call(this, f, d ? g.html() : c);
                g.domManip(b, d, j)
            });
            if (this[0]) {
                f = e.buildFragment(b, this, v);
                m = f.fragment;
                g = m.firstChild;
                1 === m.childNodes.length && (m = g);
                if (g) {
                    d = d && e.nodeName(g, "tr");
                    for (f = f.cacheable || s - 1; t < s; t++) j.call(d && e.nodeName(this[t], "table") ? this[t].getElementsByTagName("tbody")[0] || this[t].appendChild(this[t].ownerDocument.createElement("tbody")) : this[t], t === f ? m : e.clone(m, !0, !0))
                }
                m = g = null;
                v.length && e.each(v, function(b, c) {
                    c.src ? e.ajax ? e.ajax({
                        url: c.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : e.error("no ajax") : e.globalEval((c.text || c.textContent || c.innerHTML || "").replace(ud,
                        ""));
                    c.parentNode && c.parentNode.removeChild(c)
                })
            }
            return this
        }
		
    });
    e.buildFragment = function(b, d, j) {
        var f, g, m, t = b[0];
        return d = d || C, d = !d.nodeType && d[0] || d, d = d.ownerDocument || d, 1 === b.length && "string" == typeof t && 512 > t.length && d === C && "<" === t.charAt(0) && !sd.test(t) && (e.support.checkClone || !hc.test(t)) && (e.support.html5Clone || !sb.test(t)) && (g = !0, f = e.fragments[t], m = f !== c), f || (f = d.createDocumentFragment(), e.clean(b, d, f, j), g && (e.fragments[t] = m && f)), {
            fragment: f,
            cacheable: g
        }
    };
    e.fragments = {};
    e.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(b, c) {
        e.fn[b] = function(d) {
            var j, f = 0,
                g = [];
            d = e(d);
            var m = d.length;
            j = 1 === this.length && this[0].parentNode;
            if ((null == j || j && 11 === j.nodeType && 1 === j.childNodes.length) && 1 === m) return d[c](this[0]), this;
            for (; f < m; f++) j = (0 < f ? this.clone(!0) : this).get(), e(d[f])[c](j), g = g.concat(j);
            return this.pushStack(g, b, d.selector)
        }
    });
    e.extend({
        clone: function(b, c, d) {
            var f, g, l, t;
            e.support.html5Clone || e.isXMLDoc(b) || !sb.test("<" + b.nodeName +
                ">") ? t = b.cloneNode(!0) : (tb.innerHTML = b.outerHTML, tb.removeChild(t = tb.firstChild));
            if ((!e.support.noCloneEvent || !e.support.noCloneChecked) && (1 === b.nodeType || 11 === b.nodeType) && !e.isXMLDoc(b)) {
                j(b, t);
                f = m(b);
                g = m(t);
                for (l = 0; f[l]; ++l) g[l] && j(f[l], g[l])
            }
            if (c && (u(b, t), d)) {
                f = m(b);
                g = m(t);
                for (l = 0; f[l]; ++l) u(f[l], g[l])
            }
            return t
        },
        clean: function(b, c, d, j) {
            var f, g, m, l, s, p, u, D = c === C && ic,
                x = [];
            if (!c || "undefined" == typeof c.createDocumentFragment) c = C;
            for (f = 0; null != (m = b[f]); f++)
                if ("number" == typeof m && (m += ""), m) {
                    if ("string" ==
                        typeof m)
                        if (qd.test(m)) {
                            D = D || y(c);
                            p = c.createElement("div");
                            D.appendChild(p);
                            m = m.replace(fc, "<$1></$2>");
                            g = (gc.exec(m) || ["", ""])[1].toLowerCase();
                            l = V[g] || V._default;
                            s = l[0];
                            for (p.innerHTML = l[1] + m + l[2]; s--;) p = p.lastChild;
                            if (!e.support.tbody) {
                                s = pd.test(m);
                                l = "table" === g && !s ? p.firstChild && p.firstChild.childNodes : "<table>" === l[1] && !s ? p.childNodes : [];
                                for (g = l.length - 1; 0 <= g; --g) e.nodeName(l[g], "tbody") && !l[g].childNodes.length && l[g].parentNode.removeChild(l[g])
                            }!e.support.leadingWhitespace && rb.test(m) && p.insertBefore(c.createTextNode(rb.exec(m)[0]),
                                p.firstChild);
                            m = p.childNodes;
                            p.parentNode.removeChild(p)
                        } else m = c.createTextNode(m);
                    m.nodeType ? x.push(m) : e.merge(x, m)
                }
            p && (m = p = D = null);
            if (!e.support.appendChecked)
                for (f = 0; null != (m = x[f]); f++) e.nodeName(m, "input") ? v(m) : "undefined" != typeof m.getElementsByTagName && e.grep(m.getElementsByTagName("input"), v);
            if (d) {
                b = function(b) {
                    if (!b.type || td.test(b.type)) return j ? j.push(b.parentNode ? b.parentNode.removeChild(b) : b) : d.appendChild(b)
                };
                for (f = 0; null != (m = x[f]); f++)
                    if (!e.nodeName(m, "script") || !b(m)) d.appendChild(m),
                        "undefined" != typeof m.getElementsByTagName && (u = e.grep(e.merge([], m.getElementsByTagName("script")), b), x.splice.apply(x, [f + 1, 0].concat(u)), f += u.length)
            }
            return x
        },
        cleanData: function(b, c) {
            for (var d, j, f, g, m = 0, l = e.expando, v = e.cache, s = e.support.deleteExpando, p = e.event.special; null != (f = b[m]); m++)
                if (c || e.acceptData(f))
                    if (d = (j = f[l]) && v[j]) {
                        if (d.events)
                            for (g in d.events) p[g] ? e.event.remove(f, g) : e.removeEvent(f, g, d.handle);
                        v[j] && (delete v[j], s ? delete f[l] : f.removeAttribute ? f.removeAttribute(l) : f[l] = null, e.deletedIds.push(j))
                    }
        }
    });
    var Va, da;
    e.uaMatch = function(b) {
        b = b.toLowerCase();
        b = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || 0 > b.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [];
        return {
            browser: b[1] || "",
            version: b[2] || "0"
        }
    };
    Va = e.uaMatch(Ac.userAgent);
    da = {};
    Va.browser && (da[Va.browser] = !0, da.version = Va.version);
    da.chrome ? da.webkit = !0 : da.webkit && (da.safari = !0);
    e.browser = da;
    e.sub = function() {
        function b(c, d) {
            return new b.fn.init(c,
                d)
        }
        e.extend(!0, b, this);
        b.superclass = this;
        b.fn = b.prototype = this();
        b.fn.constructor = b;
        b.sub = this.sub;
        b.fn.init = function(d, j) {
            return j && j instanceof e && !(j instanceof b) && (j = b(j)), e.fn.init.call(this, d, j, c)
        };
        b.fn.init.prototype = b.fn;
        var c = b(C);
        return b
    };
    var Q, la, ma, ub = /alpha\([^)]*\)/i,
        vd = /opacity=([^)]*)/,
        wd = /^(top|right|bottom|left)$/,
        xd = /^(none|table(?!-c[ea]).+)/,
        jc = /^margin/,
        wc = RegExp("^(" + Fa + ")(.*)$", "i"),
        ya = RegExp("^(" + Fa + ")(?!px)[a-z%]+$", "i"),
        yd = RegExp("^([-+])=(" + Fa + ")", "i"),
        Za = {},
        zd = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        kc = {
            letterSpacing: 0,
            fontWeight: 400
        },
        ea = ["Top", "Right", "Bottom", "Left"],
        zb = ["Webkit", "O", "Moz", "ms"],
        Ad = e.fn.toggle;
    e.fn.extend({
        css: function(b, d) {
            return e.access(this, function(b, d, j) {
                return j !== c ? e.style(b, d, j) : e.css(b, d)
            }, b, d, 1 < arguments.length)
        },
        show: function() {
            return F(this, !0)
        },
        hide: function() {
            return F(this)
        },
        toggle: function(b, c) {
            var d = "boolean" == typeof b;
            return e.isFunction(b) && e.isFunction(c) ? Ad.apply(this, arguments) : this.each(function() {
                (d ? b : N(this)) ? e(this).show():
                    e(this).hide()
            })
        }
    });
    e.extend({
        cssHooks: {
            opacity: {
                get: function(b, c) {
                    if (c) {
                        var d = Q(b, "opacity");
                        return "" === d ? "1" : d
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": e.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(b, d, j, f) {
            if (b && !(3 === b.nodeType || 8 === b.nodeType || !b.style)) {
                var g, m, l, v = e.camelCase(d),
                    s = b.style;
                d = e.cssProps[v] || (e.cssProps[v] = D(s, v));
                l = e.cssHooks[d] || e.cssHooks[v];
                if (j === c) return l && "get" in l && (g = l.get(b, !1, f)) !== c ? g : s[d];
                m = typeof j;
                "string" === m && (g = yd.exec(j)) && (j = (g[1] + 1) * g[2] + parseFloat(e.css(b, d)), m = "number");
                if (!(null == j || "number" === m && isNaN(j)))
                    if ("number" === m && !e.cssNumber[v] && (j += "px"), !l || !("set" in l) || (j = l.set(b, j, f)) !== c) try {
                        s[d] = j
                    } catch (p) {}
            }
        },
        css: function(b, d, j, f) {
            var g, m, l, v = e.camelCase(d);
            return d = e.cssProps[v] || (e.cssProps[v] = D(b.style, v)), l = e.cssHooks[d] || e.cssHooks[v], l && "get" in l && (g = l.get(b, !0, f)), g === c && (g = Q(b, d)), "normal" === g && d in kc && (g = kc[d]), j || f !== c ? (m = parseFloat(g), j ||
                e.isNumeric(m) ? m || 0 : g) : g
        },
        swap: function(b, c, d) {
            var e, j = {};
            for (e in c) j[e] = b.style[e], b.style[e] = c[e];
            d = d.call(b);
            for (e in c) b.style[e] = j[e];
            return d
        }
    });
    b.getComputedStyle ? Q = function(c, d) {
        var j, f, g, m, l = b.getComputedStyle(c, null),
            v = c.style;
        return l && (j = l[d], "" === j && !e.contains(c.ownerDocument, c) && (j = e.style(c, d)), ya.test(j) && jc.test(d) && (f = v.width, g = v.minWidth, m = v.maxWidth, v.minWidth = v.maxWidth = v.width = j, j = l.width, v.width = f, v.minWidth = g, v.maxWidth = m)), j
    } : C.documentElement.currentStyle && (Q = function(b,
        c) {
        var d, e, j = b.currentStyle && b.currentStyle[c],
            f = b.style;
        return null == j && f && f[c] && (j = f[c]), ya.test(j) && !wd.test(c) && (d = f.left, e = b.runtimeStyle && b.runtimeStyle.left, e && (b.runtimeStyle.left = b.currentStyle.left), f.left = "fontSize" === c ? "1em" : j, j = f.pixelLeft + "px", f.left = d, e && (b.runtimeStyle.left = e)), "" === j ? "auto" : j
    });
    e.each(["height", "width"], function(b, c) {
        e.cssHooks[c] = {
            get: function(b, d, j) {
                if (d) return 0 === b.offsetWidth && xd.test(Q(b, "display")) ? e.swap(b, zd, function() {
                    return H(b, c, j)
                }) : H(b, c, j)
            },
            set: function(b,
                d, j) {
                return E(b, d, j ? Ya(b, c, j, e.support.boxSizing && "border-box" === e.css(b, "boxSizing")) : 0)
            }
        }
    });
    e.support.opacity || (e.cssHooks.opacity = {
        get: function(b, c) {
            return vd.test((c && b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
        },
        set: function(b, c) {
            var d = b.style,
                j = b.currentStyle,
                f = e.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : "",
                g = j && j.filter || d.filter || "";
            d.zoom = 1;
            if (!(1 <= c && "" === e.trim(g.replace(ub, "")) && d.removeAttribute && (d.removeAttribute("filter"), j && !j.filter))) d.filter =
                ub.test(g) ? g.replace(ub, f) : g + " " + f
        }
    });
    e(function() {
        e.support.reliableMarginRight || (e.cssHooks.marginRight = {
            get: function(b, c) {
                return e.swap(b, {
                    display: "inline-block"
                }, function() {
                    if (c) return Q(b, "marginRight")
                })
            }
        });
        !e.support.pixelPosition && e.fn.position && e.each(["top", "left"], function(b, c) {
            e.cssHooks[c] = {
                get: function(b, d) {
                    if (d) {
                        var j = Q(b, c);
                        return ya.test(j) ? e(b).position()[c] + "px" : j
                    }
                }
            }
        })
    });
    e.expr && e.expr.filters && (e.expr.filters.hidden = function(b) {
        return 0 === b.offsetWidth && 0 === b.offsetHeight || !e.support.reliableHiddenOffsets &&
            "none" === (b.style && b.style.display || Q(b, "display"))
    }, e.expr.filters.visible = function(b) {
        return !e.expr.filters.hidden(b)
    });
    e.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(b, c) {
        e.cssHooks[b + c] = {
            expand: function(d) {
                var e = "string" == typeof d ? d.split(" ") : [d],
                    j = {};
                for (d = 0; 4 > d; d++) j[b + ea[d] + c] = e[d] || e[d - 2] || e[0];
                return j
            }
        };
        jc.test(b) || (e.cssHooks[b + c].set = E)
    });
    var Bd = /%20/g,
        xc = /\[\]$/,
        lc = /\r?\n/g,
        Cd = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Dd = /^(?:select|textarea)/i;
    e.fn.extend({
        serialize: function() {
            return e.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? e.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Dd.test(this.nodeName) || Cd.test(this.type))
            }).map(function(b, c) {
                var d = e(this).val();
                return null == d ? null : e.isArray(d) ? e.map(d, function(b) {
                    return {
                        name: c.name,
                        value: b.replace(lc, "\r\n")
                    }
                }) : {
                    name: c.name,
                    value: d.replace(lc, "\r\n")
                }
            }).get()
        }
    });
    e.param = function(b, d) {
        var j, f = [],
            g = function(b, c) {
                c = e.isFunction(c) ? c() : null == c ? "" : c;
                f[f.length] = encodeURIComponent(b) + "=" + encodeURIComponent(c)
            };
        d === c && (d = e.ajaxSettings && e.ajaxSettings.traditional);
        if (e.isArray(b) || b.jquery && !e.isPlainObject(b)) e.each(b, function() {
            g(this.name, this.value)
        });
        else
            for (j in b) M(j, b[j], d, g);
        return f.join("&").replace(Bd, "+")
    };
    var qa, ka, Ed = /#.*$/,
        Fd = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Gd = /^(?:GET|HEAD)$/,
        Hd = /^\/\//,
        mc = /\?/,
        Id = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Jd = /([?&])_=[^&]*/,
        nc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        oc = e.fn.load,
        $a = {},
        pc = {},
        qc = ["*/"] + ["*"];
    try {
        ka = zc.href
    } catch (Sd) {
        ka = C.createElement("a"), ka.href = "", ka = ka.href
    }
    qa = nc.exec(ka.toLowerCase()) || [];
    e.fn.load = function(b, d, j) {
        if ("string" != typeof b && oc) return oc.apply(this, arguments);
        if (!this.length) return this;
        var f, g, m, l = this,
            v = b.indexOf(" ");
        return 0 <= v && (f = b.slice(v, b.length), b = b.slice(0, v)), e.isFunction(d) ? (j = d, d = c) : d && "object" == typeof d && (g = "POST"), e.ajax({
            url: b,
            type: g,
            dataType: "html",
            data: d,
            complete: function(b, c) {
                j && l.each(j, m || [b.responseText, c, b])
            }
        }).done(function(b) {
            m = arguments;
            l.html(f ? e("<div>").append(b.replace(Id, "")).find(f) : b)
        }), this
    };
    e.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, c) {
        e.fn[c] = function(b) {
            return this.on(c, b)
        }
    });
    e.each(["get", "post"], function(b, d) {
        e[d] = function(b, j, f, g) {
            return e.isFunction(j) && (g = g || f, f = j, j = c), e.ajax({
                type: d,
                url: b,
                data: j,
                success: f,
                dataType: g
            })
        }
    });
    e.extend({
        getScript: function(b, d) {
            return e.get(b,
                c, d, "script")
        },
        getJSON: function(b, c, d) {
            return e.get(b, c, d, "json")
        },
        ajaxSetup: function(b, c) {
            return c ? sa(b, e.ajaxSettings) : (c = b, b = e.ajaxSettings), sa(b, c), b
        },
        ajaxSettings: {
            url: ka,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(qa[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": qc
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": b.String,
                "text html": !0,
                "text json": e.parseJSON,
                "text xml": e.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: za($a),
        ajaxTransport: za(pc),
        ajax: function(b, d) {
            function j(b, d, m, q) {
                var n, r, s, y, A, F = d;
                if (2 !== H) {
                    H = 2;
                    v && clearTimeout(v);
                    l = c;
                    g = q || "";
                    J.readyState = 0 < b ? 4 : 0;
                    if (m) {
                        y = u;
                        q = J;
                        var U, R, G, K, L = y.contents,
                            M = y.dataTypes,
                            P = y.responseFields;
                        for (R in P) R in m && (q[P[R]] = m[R]);
                        for (;
                            "*" === M[0];) M.shift(),
                            U === c && (U = y.mimeType || q.getResponseHeader("content-type"));
                        if (U)
                            for (R in L)
                                if (L[R] && L[R].test(U)) {
                                    M.unshift(R);
                                    break
                                }
                        if (M[0] in m) G = M[0];
                        else {
                            for (R in m) {
                                if (!M[0] || y.converters[R + " " + M[0]]) {
                                    G = R;
                                    break
                                }
                                K || (K = R)
                            }
                            G = G || K
                        }
                        y = m = G ? (G !== M[0] && M.unshift(G), m[G]) : void 0
                    }
                    if (200 <= b && 300 > b || 304 === b)
                        if (u.ifModified && (A = J.getResponseHeader("Last-Modified"), A && (e.lastModified[f] = A), A = J.getResponseHeader("Etag"), A && (e.etag[f] = A)), 304 === b) F = "notmodified", n = !0;
                        else {
                            var I;
                            a: {
                                n = u;r = y;
                                var O, F = n.dataTypes.slice();m = F[0];U = {};R = 0;n.dataFilter && (r = n.dataFilter(r, n.dataType));
                                if (F[1])
                                    for (I in n.converters) U[I.toLowerCase()] = n.converters[I];
                                for (; s = F[++R];)
                                    if ("*" !== s) {
                                        if ("*" !== m && m !== s) {
                                            I = U[m + " " + s] || U["* " + s];
                                            if (!I)
                                                for (O in U)
                                                    if (A = O.split(" "), A[1] === s && (I = U[m + " " + A[0]] || U["* " + A[0]])) {
                                                        !0 === I ? I = U[O] : !0 !== U[O] && (s = A[0], F.splice(R--, 0, s));
                                                        break
                                                    }
                                            if (!0 !== I)
                                                if (I && n["throws"]) r = I(r);
                                                else try {
                                                    r = I(r)
                                                } catch (Q) {
                                                    I = {
                                                        state: "parsererror",
                                                        error: I ? Q : "No conversion from " + m + " to " + s
                                                    };
                                                    break a
                                                }
                                        }
                                        m = s
                                    }
                                I = {
                                    state: "success",
                                    data: r
                                }
                            }
                            n = I;
                            F = n.state;
                            r = n.data;
                            s = n.error;
                            n = !s
                        }
                    else if (s = F, !F || b) F = "error", 0 > b && (b = 0);
                    J.status = b;
                    J.statusText = (d || F) + "";
                    n ? N.resolveWith(D, [r, F, J]) : N.rejectWith(D, [J, F, s]);
                    J.statusCode(C);
                    C = c;
                    p && x.trigger("ajax" + (n ? "Success" : "Error"), [J, u, n ? r : s]);
                    E.fireWith(D, [J, F]);
                    p && (x.trigger("ajaxComplete", [J, u]), --e.active || e.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof b && (d = b, b = c);
            d = d || {};
            var f, g, m, l, v, s, p, y, u = e.ajaxSetup({}, d),
                D = u.context || u,
                x = D !== u && (D.nodeType || D instanceof e) ? e(D) : e.event,
                N = e.Deferred(),
                E = e.Callbacks("once memory"),
                C = u.statusCode || {},
                F = {},
                G = {},
                H = 0,
                K = "canceled",
                J = {
                    readyState: 0,
                    setRequestHeader: function(b, c) {
                        if (!H) {
                            var d = b.toLowerCase();
                            b = G[d] = G[d] || b;
                            F[b] = c
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === H ? g : null
                    },
                    getResponseHeader: function(b) {
                        var d;
                        if (2 === H) {
                            if (!m)
                                for (m = {}; d = Fd.exec(g);) m[d[1].toLowerCase()] = d[2];
                            d = m[b.toLowerCase()]
                        }
                        return d === c ? null : d
                    },
                    overrideMimeType: function(b) {
                        return H || (u.mimeType = b), this
                    },
                    abort: function(b) {
                        return b = b || K, l && l.abort(b), j(0, b), this
                    }
                };
            N.promise(J);
            J.success = J.done;
            J.error = J.fail;
            J.complete = E.add;
            J.statusCode = function(b) {
                if (b) {
                    var c;
                    if (2 > H)
                        for (c in b) C[c] = [C[c], b[c]];
                    else c = b[J.status], J.always(c)
                }
                return this
            };
            u.url = ((b || u.url) + "").replace(Ed, "").replace(Hd, qa[1] + "//");
            u.dataTypes = e.trim(u.dataType || "*").toLowerCase().split(fa);
            null == u.crossDomain && (s = nc.exec(u.url.toLowerCase()) || !1, u.crossDomain = s && s.join(":") + (s[3] ? "" : "http:" === s[1] ? 80 : 443) !== qa.join(":") + (qa[3] ? "" : "http:" === qa[1] ? 80 : 443));
            u.data && u.processData && "string" != typeof u.data && (u.data = e.param(u.data,
                u.traditional));
            na($a, u, d, J);
            if (2 === H) return J;
            p = u.global;
            u.type = u.type.toUpperCase();
            u.hasContent = !Gd.test(u.type);
            p && 0 === e.active++ && e.event.trigger("ajaxStart");
            if (!u.hasContent && (u.data && (u.url += (mc.test(u.url) ? "&" : "?") + u.data, delete u.data), f = u.url, !1 === u.cache)) {
                s = e.now();
                var L = u.url.replace(Jd, "$1_=" + s);
                u.url = L + (L === u.url ? (mc.test(u.url) ? "&" : "?") + "_=" + s : "")
            }(u.data && u.hasContent && !1 !== u.contentType || d.contentType) && J.setRequestHeader("Content-Type", u.contentType);
            u.ifModified && (f = f || u.url,
                e.lastModified[f] && J.setRequestHeader("If-Modified-Since", e.lastModified[f]), e.etag[f] && J.setRequestHeader("If-None-Match", e.etag[f]));
            J.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + qc + "; q=0.01" : "") : u.accepts["*"]);
            for (y in u.headers) J.setRequestHeader(y, u.headers[y]);
            if (!u.beforeSend || !1 !== u.beforeSend.call(D, J, u) && 2 !== H) {
                K = "abort";
                for (y in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) J[y](u[y]);
                if (l = na(pc, u, d, J)) {
                    J.readyState = 1;
                    p && x.trigger("ajaxSend", [J, u]);
                    u.async && 0 < u.timeout && (v = setTimeout(function() {
                        J.abort("timeout")
                    }, u.timeout));
                    try {
                        H = 1, l.send(F, j)
                    } catch (M) {
                        if (2 > H) j(-1, M);
                        else throw M;
                    }
                } else j(-1, "No Transport");
                return J
            }
            return J.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var rc = [],
        Kd = /\?/,
        Wa = /(=)\?(?=&|$)|\?\?/,
        Ld = e.now();
    e.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var b = rc.pop() || e.expando + "_" + Ld++;
            return this[b] = !0, b
        }
    });
    e.ajaxPrefilter("json jsonp", function(d, j, f) {
        var g, m, l, v = d.data,
            s = d.url,
            p = !1 !== d.jsonp,
            u = p && Wa.test(s),
            y = p && !u && "string" == typeof v && !(d.contentType || "").indexOf("application/x-www-form-urlencoded") && Wa.test(v);
        if ("jsonp" === d.dataTypes[0] || u || y) return g = d.jsonpCallback = e.isFunction(d.jsonpCallback) ? d.jsonpCallback() : d.jsonpCallback, m = b[g], u ? d.url = s.replace(Wa, "$1" + g) : y ? d.data = v.replace(Wa, "$1" + g) : p && (d.url += (Kd.test(s) ? "&" : "?") + d.jsonp + "=" + g), d.converters["script json"] = function() {
            return l || e.error(g + " was not called"), l[0]
        }, d.dataTypes[0] = "json", b[g] = function() {
            l = arguments
        }, f.always(function() {
            b[g] =
                m;
            d[g] && (d.jsonpCallback = j.jsonpCallback, rc.push(g));
            l && e.isFunction(m) && m(l[0]);
            l = m = c
        }), "script"
    });
    e.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(b) {
                return e.globalEval(b), b
            }
        }
    });
    e.ajaxPrefilter("script", function(b) {
        b.cache === c && (b.cache = !1);
        b.crossDomain && (b.type = "GET", b.global = !1)
    });
    e.ajaxTransport("script", function(b) {
        if (b.crossDomain) {
            var d, e =
                C.head || C.getElementsByTagName("head")[0] || C.documentElement;
            return {
                send: function(j, f) {
                    d = C.createElement("script");
                    d.async = "async";
                    b.scriptCharset && (d.charset = b.scriptCharset);
                    d.src = b.url;
                    d.onload = d.onreadystatechange = function(b, j) {
                        if (j || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = c, j || f(200, "success")
                    };
                    e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ra, vb = b.ActiveXObject ? function() {
            for (var b in ra) ra[b](0,
                1)
        } : !1,
        Md = 0;
    e.ajaxSettings.xhr = b.ActiveXObject ? function() {
        var c;
        if (!(c = !this.isLocal && Ab())) a: {
            try {
                c = new b.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (d) {}
            c = void 0
        }
        return c
    } : Ab;
    var wb = e.ajaxSettings.xhr();
    e.extend(e.support, {
        ajax: !!wb,
        cors: !!wb && "withCredentials" in wb
    });
    e.support.ajax && e.ajaxTransport(function(d) {
        if (!d.crossDomain || e.support.cors) {
            var j;
            return {
                send: function(f, g) {
                    var m, l, v = d.xhr();
                    d.username ? v.open(d.type, d.url, d.async, d.username, d.password) : v.open(d.type, d.url, d.async);
                    if (d.xhrFields)
                        for (l in d.xhrFields) v[l] =
                            d.xhrFields[l];
                    d.mimeType && v.overrideMimeType && v.overrideMimeType(d.mimeType);
                    !d.crossDomain && !f["X-Requested-With"] && (f["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (l in f) v.setRequestHeader(l, f[l])
                    } catch (s) {}
                    v.send(d.hasContent && d.data || null);
                    j = function(b, f) {
                        var l, r, s, p, u;
                        try {
                            if (j && (f || 4 === v.readyState))
                                if (j = c, m && (v.onreadystatechange = e.noop, vb && delete ra[m]), f) 4 !== v.readyState && v.abort();
                                else {
                                    l = v.status;
                                    s = v.getAllResponseHeaders();
                                    p = {};
                                    (u = v.responseXML) && u.documentElement && (p.xml = u);
                                    try {
                                        p.text =
                                            v.responseText
                                    } catch (y) {}
                                    try {
                                        r = v.statusText
                                    } catch (D) {
                                        r = ""
                                    }!l && d.isLocal && !d.crossDomain ? l = p.text ? 200 : 404 : 1223 === l && (l = 204)
                                }
                        } catch (A) {
                            f || g(-1, A)
                        }
                        p && g(l, r, p, s)
                    };
                    d.async ? 4 === v.readyState ? setTimeout(j, 0) : (m = ++Md, vb && (ra || (ra = {}, e(b).unload(vb)), ra[m] = j), v.onreadystatechange = j) : j()
                },
                abort: function() {
                    j && j(0, 1)
                }
            }
        }
    });
    var Aa, Xa, Nd = /^(?:toggle|show|hide)$/,
        Od = RegExp("^(?:([-+])=|)(" + Fa + ")([a-z%]*)$", "i"),
        Pd = /queueHooks$/,
        Ba = [function(b, c, d) {
            var j, f, g, m, l, v, s = this,
                p = b.style,
                u = {},
                y = [],
                D = b.nodeType && N(b);
            d.queue ||
                (l = e._queueHooks(b, "fx"), null == l.unqueued && (l.unqueued = 0, v = l.empty.fire, l.empty.fire = function() {
                    l.unqueued || v()
                }), l.unqueued++, s.always(function() {
                    s.always(function() {
                        l.unqueued--;
                        e.queue(b, "fx").length || l.empty.fire()
                    })
                }));
            1 === b.nodeType && ("height" in c || "width" in c) && (d.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === e.css(b, "display") && "none" === e.css(b, "float") && (!e.support.inlineBlockNeedsLayout || "inline" === P(b.nodeName) ? p.display = "inline-block" : p.zoom = 1));
            d.overflow && (p.overflow = "hidden",
                e.support.shrinkWrapBlocks || s.done(function() {
                    p.overflow = d.overflow[0];
                    p.overflowX = d.overflow[1];
                    p.overflowY = d.overflow[2]
                }));
            for (j in c) f = c[j], Nd.exec(f) && (delete c[j], f !== (D ? "hide" : "show") && y.push(j));
            if (f = y.length) {
                g = e._data(b, "fxshow") || e._data(b, "fxshow", {});
                D ? e(b).show() : s.done(function() {
                    e(b).hide()
                });
                s.done(function() {
                    var c;
                    e.removeData(b, "fxshow", !0);
                    for (c in u) e.style(b, c, u[c])
                });
                for (j = 0; j < f; j++) c = y[j], m = s.createTween(c, D ? g[c] : 0), u[c] = g[c] || e.style(b, c), c in g || (g[c] = m.start, D && (m.end = m.start,
                    m.start = "width" === c || "height" === c ? 1 : 0))
            }
        }],
        ta = {
            "*": [function(b, c) {
                var d, j, f = this.createTween(b, c),
                    g = Od.exec(c),
                    m = f.cur(),
                    l = +m || 0,
                    v = 1,
                    s = 20;
                if (g) {
                    d = +g[2];
                    j = g[3] || (e.cssNumber[b] ? "" : "px");
                    if ("px" !== j && l) {
                        l = e.css(f.elem, b, !0) || d || 1;
                        do v = v || ".5", l /= v, e.style(f.elem, b, l + j); while (v !== (v = f.cur() / m) && 1 !== v && --s)
                    }
                    f.unit = j;
                    f.start = l;
                    f.end = g[1] ? l + (g[1] + 1) * d : d
                }
                return f
            }]
        };
    e.Animation = e.extend(Cb, {
        tweener: function(b, c) {
            e.isFunction(b) ? (c = b, b = ["*"]) : b = b.split(" ");
            for (var d, j = 0, f = b.length; j < f; j++) d = b[j], ta[d] = ta[d] || [], ta[d].unshift(c)
        },
        prefilter: function(b, c) {
            c ? Ba.unshift(b) : Ba.push(b)
        }
    });
    e.Tween = S;
    S.prototype = {
        constructor: S,
        init: function(b, c, d, j, f, g) {
            this.elem = b;
            this.prop = d;
            this.easing = f || "swing";
            this.options = c;
            this.start = this.now = this.cur();
            this.end = j;
            this.unit = g || (e.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var b = S.propHooks[this.prop];
            return b && b.get ? b.get(this) : S.propHooks._default.get(this)
        },
        run: function(b) {
            var c, d = S.propHooks[this.prop];
            return this.options.duration ? this.pos = c = e.easing[this.easing](b, this.options.duration *
                b, 0, 1, this.options.duration) : this.pos = c = b, this.now = (this.end - this.start) * c + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : S.propHooks._default.set(this), this
        }
    };
    S.prototype.init.prototype = S.prototype;
    S.propHooks = {
        _default: {
            get: function(b) {
                var c;
                return null == b.elem[b.prop] || b.elem.style && null != b.elem.style[b.prop] ? (c = e.css(b.elem, b.prop, !1, ""), !c || "auto" === c ? 0 : c) : b.elem[b.prop]
            },
            set: function(b) {
                e.fx.step[b.prop] ? e.fx.step[b.prop](b) : b.elem.style &&
                    (null != b.elem.style[e.cssProps[b.prop]] || e.cssHooks[b.prop]) ? e.style(b.elem, b.prop, b.now + b.unit) : b.elem[b.prop] = b.now
            }
        }
    };
    S.propHooks.scrollTop = S.propHooks.scrollLeft = {
        set: function(b) {
            b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
        }
    };
    e.each(["toggle", "show", "hide"], function(b, c) {
        var d = e.fn[c];
        e.fn[c] = function(j, f, g) {
            return null == j || "boolean" == typeof j || !b && e.isFunction(j) && e.isFunction(f) ? d.apply(this, arguments) : this.animate(Da(c, !0), j, f, g)
        }
    });
    e.fn.extend({
        fadeTo: function(b, c, d, e) {
            return this.filter(N).css("opacity",
                0).show().end().animate({
                opacity: c
            }, b, d, e)
        },
        animate: function(b, c, d, j) {
            var f = e.isEmptyObject(b),
                g = e.speed(c, d, j);
            c = function() {
                var c = Cb(this, e.extend({}, b), g);
                f && c.stop(!0)
            };
            return f || !1 === g.queue ? this.each(c) : this.queue(g.queue, c)
        },
        stop: function(b, d, j) {
            var f = function(b) {
                var c = b.stop;
                delete b.stop;
                c(j)
            };
            return "string" != typeof b && (j = d, d = b, b = c), d && !1 !== b && this.queue(b || "fx", []), this.each(function() {
                var c = !0,
                    d = null != b && b + "queueHooks",
                    g = e.timers,
                    m = e._data(this);
                if (d) m[d] && m[d].stop && f(m[d]);
                else
                    for (d in m) m[d] &&
                        m[d].stop && Pd.test(d) && f(m[d]);
                for (d = g.length; d--;) g[d].elem === this && (null == b || g[d].queue === b) && (g[d].anim.stop(j), c = !1, g.splice(d, 1));
                (c || !j) && e.dequeue(this, b)
            })
        }
    });
    e.each({
        slideDown: Da("show"),
        slideUp: Da("hide"),
        slideToggle: Da("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(b, c) {
        e.fn[b] = function(b, d, e) {
            return this.animate(c, b, d, e)
        }
    });
    e.speed = function(b, c, d) {
        var j = b && "object" == typeof b ? e.extend({}, b) : {
            complete: d || !d && c || e.isFunction(b) && b,
            duration: b,
            easing: d && c || c && !e.isFunction(c) && c
        };
        j.duration = e.fx.off ? 0 : "number" == typeof j.duration ? j.duration : j.duration in e.fx.speeds ? e.fx.speeds[j.duration] : e.fx.speeds._default;
        if (null == j.queue || !0 === j.queue) j.queue = "fx";
        return j.old = j.complete, j.complete = function() {
            e.isFunction(j.old) && j.old.call(this);
            j.queue && e.dequeue(this, j.queue)
        }, j
    };
    e.easing = {
        linear: function(b) {
            return b
        },
        swing: function(b) {
            return 0.5 - Math.cos(b * Math.PI) / 2
        }
    };
    e.timers = [];
    e.fx = S.prototype.init;
    e.fx.tick = function() {
        for (var b, c = e.timers,
                d = 0; d < c.length; d++) b = c[d], !b() && c[d] === b && c.splice(d--, 1);
        c.length || e.fx.stop()
    };
    e.fx.timer = function(b) {
        b() && e.timers.push(b) && !Xa && (Xa = setInterval(e.fx.tick, e.fx.interval))
    };
    e.fx.interval = 13;
    e.fx.stop = function() {
        clearInterval(Xa);
        Xa = null
    };
    e.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    e.fx.step = {};
    e.expr && e.expr.filters && (e.expr.filters.animated = function(b) {
        return e.grep(e.timers, function(c) {
            return b === c.elem
        }).length
    });
    var sc = /^(?:body|html)$/i;
    e.fn.offset = function(b) {
        if (arguments.length) return b ===
            c ? this : this.each(function(c) {
                e.offset.setOffset(this, b, c)
            });
        var d, j, f, g, m, l, v, s = {
                top: 0,
                left: 0
            },
            p = this[0],
            u = p && p.ownerDocument;
        if (u) return (j = u.body) === p ? e.offset.bodyOffset(p) : (d = u.documentElement, e.contains(d, p) ? ("undefined" != typeof p.getBoundingClientRect && (s = p.getBoundingClientRect()), f = Db(u), g = d.clientTop || j.clientTop || 0, m = d.clientLeft || j.clientLeft || 0, l = f.pageYOffset || d.scrollTop, v = f.pageXOffset || d.scrollLeft, {
            top: s.top + l - g,
            left: s.left + v - m
        }) : s)
    };
    e.offset = {
        bodyOffset: function(b) {
            var c = b.offsetTop,
                d = b.offsetLeft;
            return e.support.doesNotIncludeMarginInBodyOffset && (c += parseFloat(e.css(b, "marginTop")) || 0, d += parseFloat(e.css(b, "marginLeft")) || 0), {
                top: c,
                left: d
            }
        },
        setOffset: function(b, c, d) {
            var j = e.css(b, "position");
            "static" === j && (b.style.position = "relative");
            var f = e(b),
                g = f.offset(),
                m = e.css(b, "top"),
                l = e.css(b, "left"),
                v = {},
                s = {},
                p, u;
            ("absolute" === j || "fixed" === j) && -1 < e.inArray("auto", [m, l]) ? (s = f.position(), p = s.top, u = s.left) : (p = parseFloat(m) || 0, u = parseFloat(l) || 0);
            e.isFunction(c) && (c = c.call(b, d, g));
            null !=
                c.top && (v.top = c.top - g.top + p);
            null != c.left && (v.left = c.left - g.left + u);
            "using" in c ? c.using.call(b, v) : f.css(v)
        }
    };
    e.fn.extend({
        position: function() {
            if (this[0]) {
                var b = this[0],
                    c = this.offsetParent(),
                    d = this.offset(),
                    j = sc.test(c[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : c.offset();
                return d.top -= parseFloat(e.css(b, "marginTop")) || 0, d.left -= parseFloat(e.css(b, "marginLeft")) || 0, j.top += parseFloat(e.css(c[0], "borderTopWidth")) || 0, j.left += parseFloat(e.css(c[0], "borderLeftWidth")) || 0, {
                    top: d.top - j.top,
                    left: d.left - j.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var b =
                        this.offsetParent || C.body; b && !sc.test(b.nodeName) && "static" === e.css(b, "position");) b = b.offsetParent;
                return b || C.body
            })
        }
    });
    e.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, d) {
        var j = /Y/.test(d);
        e.fn[b] = function(f) {
            return e.access(this, function(b, f, g) {
                var m = Db(b);
                if (g === c) return m ? d in m ? m[d] : m.document.documentElement[f] : b[f];
                m ? m.scrollTo(j ? e(m).scrollLeft() : g, j ? g : e(m).scrollTop()) : b[f] = g
            }, b, f, arguments.length, null)
        }
    });
    e.each({
        Height: "height",
        Width: "width"
    }, function(b, d) {
        e.each({
            padding: "inner" +
                b,
            content: d,
            "": "outer" + b
        }, function(j, f) {
            e.fn[f] = function(f, g) {
                var m = arguments.length && (j || "boolean" != typeof f),
                    l = j || (!0 === f || !0 === g ? "margin" : "border");
                return e.access(this, function(d, j, f) {
                    var g;
                    return e.isWindow(d) ? d.document.documentElement["client" + b] : 9 === d.nodeType ? (g = d.documentElement, Math.max(d.body["scroll" + b], g["scroll" + b], d.body["offset" + b], g["offset" + b], g["client" + b])) : f === c ? e.css(d, j, f, l) : e.style(d, j, f, l)
                }, d, m ? f : c, m, null)
            }
        })
    });
    b.jQuery = b.$ = e;
    "function" == typeof define && define.amd && define.amd.jQuery &&
        define("jquery", [], function() {
            return e
        })
})(window);
