var reactVersions = {
  "base": "1.550.30",
  "animations": "1.550.30",
  "cloud": "1.550.30",
  "components": "1.550.30",
  "componentsPreviewLayer": "1.550.30",
  "core": "1.550.30",
  "documentServices": "1.550.30",
  "editingRendererPlugins": "1.550.30",
  "fonts": "1.550.30",
  "layout": "1.550.30",
  "qaAutomation": "1.550.30",
  "skins": "1.550.30",
  "testUtils": "1.550.30",
  "tpa": "1.550.30",
  "tpaIntegration": "1.550.30",
  "tweenEngine": "1.550.30",
  "utils": "1.550.30",
  "wixSites": "1.550.30",
  "wixappsBuilder": "1.550.30",
  "wixappsClassics": "1.550.30",
  "wixappsCore": "1.550.30"
};

var startRender = function(){
"use strict";
startRender = function () {};
/*eslint strict:0 */

(function () {
    try {
        var wixBiSession = window.wixBiSession || {};
        (new Image()).src = 'http://frog.wix.com/bt?src=29&evid=3&pn=1&et=9&v=3.0&vsi=' + wixBiSession.viewerSessionId +
        '&url=' + encodeURIComponent(location.href.replace(/^http(s)?:\/\/(www\.)?/, '')) +
        '&isp=1&st=2&ts=' + (Date.now() - wixBiSession.initialTimestamp) +
        '&c=' + wixBiSession.initialTimestamp;
    } catch (e) {
        console.warn(e);
    }
}());

if (!Function.prototype.bind) {
    /*eslint-disable */
    Function.prototype.bind = function () {
        /*eslint-enable */
        var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
        return function () {
            return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}

(function () {
    try {
        var wixBiSession = window.wixBiSession || {};
        (new Image()).src = 'http://frog.wix.com/bt?src=29&evid=3&pn=1&et=10&v=3.0&vsi=' + wixBiSession.viewerSessionId +
        '&url=' + encodeURIComponent(location.href.replace(/^http(s)?:\/\/(www\.)?/, '')) +
        '&isp=1&st=2&ts=' + (Date.now() - wixBiSession.initialTimestamp) +
        '&c=' + wixBiSession.initialTimestamp;
    } catch (e) {
        console.warn(e);
    }
}());

var queryUtil = (function() {
    /**
     * Get value of URL parameter by its name
     * @param {string} name
     * @param {string} query
     * @returns {string}
     */
    function getParameterFromQuery(query, name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(query);
        return results && results[1] ? decodeURIComponent(results[1]).replace(/\+/g, ' ') : '';
    }

    (function () {
        try {
            var wixBiSession = window.wixBiSession || {};
            (new Image()).src = 'http://frog.wix.com/bt?src=29&evid=3&pn=1&et=11&v=3.0&vsi=' + wixBiSession.viewerSessionId +
            '&url=' + encodeURIComponent(location.href.replace(/^http(s)?:\/\/(www\.)?/, '')) +
            '&isp=1&st=2&ts=' + (Date.now() - wixBiSession.initialTimestamp) +
            '&c=' + wixBiSession.initialTimestamp;
        } catch (e) {
            console.warn(e);
        }
    }());

    /**
     * Get state of boolean URL parameter by its name
     * @param {string} name
     * @param {string} query
     * @returns {boolean}
     */
    function isParameterTrueInQuery(query, name) {
        return getParameterFromQuery(query, name) === 'true';
    }

    return {
        getParameterFromQuery: getParameterFromQuery,
        isParameterTrueInQuery: isParameterTrueInQuery,
        getParameterByName: getParameterFromQuery.bind(null, window.location.search),
        isParameterTrue: isParameterTrueInQuery.bind(null, window.location.search)
    };
}());

function PackagesUtil(packagesStructure, query) {
    /**
     * @param {string} str
     * @param {string} separator
     * @param {string} equalizer
     * @return {Object.<String, String>}
     */
    function reduceStringToObject(str, separator, equalizer) {
        return (str || '').split(separator).reduce(function (o, pairString) {
            var pair = pairString.split(equalizer);
            o[pair[0]] = pair[1];
            return o;
        }, {});
    }

    var queryParamsObject = reduceStringToObject(query.replace(/^\?/, ''), '&', '=');

    /**
     * returns a new reactVersions according to the packages query
     * @param {Object} versionsObject
     * @returns {Object}
     */
    this.getVersionsByQuery = function(versionsObject) {
        if (!versionsObject || !queryParamsObject) {
            return versionsObject;
        }
        var applied = {};

        function getVersionString(value) {
            if (/^\d+$/.test(value)) {
                return 'http://localhost:' + value;
            }
            if (/^[\d\.]+$/.test(value)) {
                return value;
            }
        }

        function applyVersion(version, key) {
            if (version && versionsObject[key]) {
                applied[key] = version;
            }
        }

        Object.keys(versionsObject).forEach(function(key) {
            applied[key] = versionsObject[key];
        });

        var packages = reduceStringToObject(queryParamsObject.packages, ',', ':');
        if (packages.all) {
            Object.keys(versionsObject).forEach(applyVersion.bind(null, getVersionString(packages.all)));
        }
        Object.keys(packages).forEach(function (key) {
            applyVersion(getVersionString(packages[key]), key);
        });
        return applied;
    };

    /**
     * changes the confiIg to load packages correctly, accounting the query
     * @param {Object} config
     * @returns {Object}
     */
    this.buildConfig = function(config) {
        //get all debuged resources:
        var debug = (queryParamsObject.debug || '').split(',').filter(Boolean);
        if (debug.indexOf('all') !== -1) {
            var debuggableExternals = Object.keys(config.paths).filter(function (path) {
                return config.paths[path].source;
            });
            debug = packagesStructure.concat(debuggableExternals);
        }

        //config.bundles:
        config.bundles = packagesStructure.filter(function (i) {
            return debug.indexOf(i) === -1;
        });

        //config.packages:
        config.packages = packagesStructure.filter(function (x) {
            return ~debug.indexOf(x);
        }).map(function (name) {
            return {
                name: name,
                location: 'packages/' + name + '/src/main',
                main: name
            };
        });

        //config.paths:
        Object.keys(config.paths).forEach(function (k) {
            if (typeof config.paths[k] === 'object') {
                config.paths[k] = config.paths[k][~debug.indexOf(k) ? 'source' : 'min'];
            }
        });
        config.bundles.forEach(function (i) {
            config.paths[i] = 'packages-bin/' + i + '/' + i + '.min';
        });

        return config;
    };
}

////////////////////////////////////////////////////////////////////////
// This file is generated by grunt-packages DO NOT modify
////////////////////////////////////////////////////////////////////////
var packagesUtil = new PackagesUtil(['animations', 'cloud', 'components', 'componentsPreviewLayer', 'core',
    'documentServices', 'editingRendererPlugins', 'fonts', 'layout', 'qaAutomation', 'server', 'skins', 'testUtils',
    'tpa', 'tpaIntegration', 'tweenEngine', 'utils', 'wixSites', 'wixappsBuilder', 'wixappsClassics', 'wixappsCore'],
    window.location.search);

////////////////////////////////////////////////////////////////////////

(function () {
    try {
        var wixBiSession = window.wixBiSession || {};
        (new Image()).src = 'http://frog.wix.com/bt?src=29&evid=3&pn=1&et=12&v=3.0&vsi=' + wixBiSession.viewerSessionId +
        '&url=' + encodeURIComponent(location.href.replace(/^http(s)?:\/\/(www\.)?/, '')) +
        '&isp=1&st=2&ts=' + (Date.now() - wixBiSession.initialTimestamp) +
        '&c=' + wixBiSession.initialTimestamp;
    } catch (e) {
        console.warn(e);
    }
}());

/*eslint strict:0 */

function joinURL() {
    var url = arguments[0];
    for (var i = 1; i < arguments.length; ++i) {
        url = url.replace(/\/$/, '') + '/' + arguments[i].replace(/^\//, '');
    }
    return url;
}

/*eslint strict:0 */

function instrument(serviceTopology, wixBiSession, queryUtil, siteModel) {
    var rendererModel = siteModel.rendererModel || window.rendererModel;
    var premiumFeatures = rendererModel.premiumFeatures;
    var isPremium = !!premiumFeatures && premiumFeatures.indexOf('HasDomain') !== -1;
    var base = (serviceTopology.biServerUrl || 'http://frog.wix.com').replace(/\/$/, '');

    var isBot = (function () {
        var re = [/bot/i, /Google Web Preview/i, /^Mozilla\/4\.0$/];
        var ua = window.navigator.userAgent;
        for (var i = 0; i < re.length; ++i) {
            if (re[i].test(ua)) {
                return true;
            }
        }
        return false;
    }());

    var sendMessage = isBot ?
        function () {
        } : function (src) {
            (new Image()).src = src + '&c=' + Date.now();
        };

    wixBiSession.beat = function (et) {
        wixBiSession.et = et;
        if (!rendererModel.previewMode) {
            var v = window.clientSideRender ? '3.0' : '4.0';
            var src = base + '/bt?src=29&evid=3&pn=1&vsi=' + wixBiSession.viewerSessionId +
                '&url=' + encodeURIComponent(location.href.replace(/^http(s)?:\/\/(www\.)?/, '')).substring(0, 256) +
                '&v=' + v +
                '&et=' + et +
                '&isp=' + (isPremium ? 1 : 0) +
                '&ts=' + (Date.now() - wixBiSession.initialTimestamp);
            sendMessage(src);
        }
    };

    if (queryUtil.getParameterByName('debug') && !queryUtil.isParameterTrue('beat')) {
        return;
    }

    function prepareMessage(src, evid, code) {
        src += '&evid=' + evid + '&src=' + code;

        if (window.santaBase) {
            var sourceMatches = window.santaBase.match(/([\d\.]+)\/?$/);
            src += '&ver=' + ((sourceMatches && sourceMatches[1]) || '');
        }

        if (serviceTopology) {
            var server = serviceTopology.serverName;
            if (server) {
                server = server.split('.')[0];
                if (server) {
                    src += '&server=' + server;
                }
            }
        }

        if (rendererModel) {
            if (rendererModel.siteInfo && rendererModel.siteInfo.siteId) {
                src += '&did=' + rendererModel.siteInfo.siteId;
            }
            if (rendererModel.metaSiteId) {
                src += '&msid=' + rendererModel.metaSiteId;
            }
        }
        var siteHeader = siteModel.siteHeader || window.siteHeader;
        if (siteHeader && siteHeader.userId) {
            src += '&uid=' + siteHeader.userId;
        }
        var publicModel = siteModel.publicModel;
        if (publicModel && publicModel.timeSincePublish) {
            src += '&tsp=' + publicModel.timeSincePublish;
        }
        src += '&vsi=' + wixBiSession.viewerSessionId;

        return src;
    }

    var notify = function (code, severity) {
        notify = function () {}; // only want to report one error per session

        var src = base + '/trg?errc=' + code + '&sev=' + severity + '&errscp=core&cat=2&iss=1&majorVer=3';
        src = prepareMessage(src, 10, 44);
        src += '&et=' + wixBiSession.et;

        var total = 0;
        var params = Array.prototype.slice.call(arguments, 2).map(function (arg, index) {
            if (total + arg.length > 1024) {
                arg = arg.substring(0, Math.max(1024 - total, 32));
            }
            var result = 'p' + (index + 1) + '=' + encodeURIComponent(arg);
            total += result.length;
            return result;
        }).join('&');
        src += '&' + params;

        sendMessage(src);
    };

    var ignoreURLs = [
        /^chrome(\-extension)?\:/, /^file\:/, /^resource\:/, /\.net\//, /\.info\//, /\.ru\//, /google/, /facebook/,
        /dropbox/, /ad\-score/, /drivemac/, /shopping/,  /datafast/, /shopcomp/, /vimeo/, /olark/
    ];
    function ignoreError(where) {
        where = where.trim();
        if (!where) {
            return true;
        }
        for (var i = 0; i < ignoreURLs.length; ++i) {
            if (ignoreURLs[i].test(where)) {
                return true;
            }
        }
        return false;
    }

    var origOnError = window.onerror || function () {};
    window.onerror = function (errorMsg, url, line, column, err) {
        var where = err && typeof err.stack === 'string' ? err.stack : url;
        if (!ignoreError(where)) {
            notify(111022, 40, errorMsg, where, line, column); // JAVASCRIPT_ERROR from packages/core/src/main/bi/errors.js
        }
        return origOnError.apply(this, arguments);
    };

    if (window.console) {
        var origError = console.error;
        if (origError) {
            console.error = function () {
                notify.bind(null, 111023, 30).apply(null, arguments); // CONSOLE_ERROR from packages/core/src/main/bi/errors.js
                return origError.apply(this, arguments);
            };
        }
    }

    var origRequireError = requirejs.onError || function () {};
    requirejs.onError = function (err) {
        var modules = (err.requireModules || []).join(';');
        var where = typeof err.stack === 'string' ? err.stack : '';
        notify(111024, 40, err.message, modules, where); // REQUIREJS_ERROR from packages/core/src/main/bi/errors.js
        return origRequireError.apply(this, arguments);
    };

    (function performanceBI() {
        if (!window.performance) {
            return;
        }
        var timing = window.performance.timing;
        if (!timing) {
            return;
        }

        var src = base + '/ugc-viewer?majorVer=3';
        src = prepareMessage(src, 351, 42);
        var length = src.length;

        var dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
        if (dnsTime >= 0) {
            src += '&dns_time=' + dnsTime;
        }
        var connectTime = timing.requestStart - timing.connectStart;
        if (connectTime >= 0) {
            src += '&connect_time=' + connectTime;
        }
        var ttfbTime = timing.responseStart - timing.requestStart;
        if (ttfbTime >= 0) {
            src += '&ttfb_time=' + ttfbTime;
        }
        var responseTime = timing.responseEnd - timing.responseStart;
        if (responseTime >= 0) {
            src += '&response_time=' + responseTime;
        }
        var loadTime = timing.navigationStart || timing.fetchStart || timing.domainLookupStart || timing.connectStart;
        loadTime = wixBiSession.initialTimestamp - loadTime;
        if (loadTime >= 0) {
            src += '&load_time=' + loadTime;
        }

        if (src.length === length) {
            return;
        }

        src += '&is_premium=' + (isPremium ? 1 : 0);
        var isWixSite = rendererModel.siteInfo.documentType === 'WixSite';
        src += '&is_wixsite=' + (isWixSite ? 1 : 0);

        sendMessage(src);
    }());
}

/*eslint strict:0 */

function prefetchPages(publicModel) {
    var contentCache = {};
    var isHttps = location.protocol === "https:";
    if (isHttps) {
        return contentCache;
    }
    if (window.pagesData && window.pagesData.masterPage) {
        return contentCache; // don't pre fetch when pages data was part of server side rendered response
    }
    function prefetch(url) {
        var r = new XMLHttpRequest();
        r.onload = function () {
            if (!(url in contentCache)) {
                try {
                    contentCache[url] = JSON.parse(r.response);
                } catch (e) {
                    // empty
                }
            }
        };
        r.open('GET', url, true);
        r.setRequestHeader('Accept', 'application/json');
        r.send();
    }

    try {
        var pageList = publicModel.pageList;
        if (pageList.masterPage) {
            prefetch(pageList.masterPage[0]);
        }
        var hash = location.hash.split('/');
        var pageId = hash[1] || pageList.mainPageId;
        var pages = pageList.pages;
        for (var i = 0; i < pages.length; ++i) {
            if (pages[i].pageId === pageId) {
                prefetch(pages[i].urls[0]);
                break;
            }
        }
    } catch (e) {
        // empty
    }
    return contentCache;
}
/*eslint strict:0 */

function convertRendererModel(rendererModel, publicModel) {
    return rendererModel && rendererModel.siteInfo ? rendererModel : {
        metaSiteId: rendererModel.metaSiteId,
        siteInfo: {
            applicationType: rendererModel.applicationType,
            documentType: rendererModel.documentType,
            siteId: rendererModel.siteId,
            siteTitleSEO: rendererModel.siteTitleSEO
        },
        clientSpecMap: rendererModel.clientSpecMap,
        cloudVersions: rendererModel.cloudVersions,
        premiumFeatures: rendererModel.premiumFeatures,
        geo: rendererModel.geo,
        languageCode: rendererModel.languageCode,
        previewMode: rendererModel.previewMode,
        userId: rendererModel.userId,
        siteMetaData: rendererModel.siteMetaData ? {
            contactInfo: rendererModel.siteMetaData.contactInfo,
            adaptiveMobileOn: publicModel && publicModel.adaptiveMobileOn,
            preloader: rendererModel.siteMetaData.preloader,
            quickActions: rendererModel.siteMetaData.quickActions
        } : undefined,
        runningExperiments: rendererModel.runningExperiments
    };
}

function convertSiteModel(rendererModel, publicModel) {
    function getPagesDataFromSiteAsJson(siteJson){
        var initialPagesData = {
            masterPage: siteJson.masterPage
        };

        return siteJson.pages.reduce(function(accum, val){
            accum[val.structure.id] = val;
            return accum;
        }, initialPagesData);
    }
    var siteModel = {
        publicModel: publicModel,
        serviceTopology: window.serviceTopology,
        santaBase: window.santaBase,
        configUrls: window.configUrls,
        rendererModel: rendererModel,
        componentGlobals: window.componentGlobals,
        serverAndClientRender: window.serverAndClientRender,
        adData: window.adData,
        mobileAdData: window.mobileAdData,
        googleAnalytics: window.googleAnalytics,
        wixData: window.wixData,
        wixapps: window.wixapps || {},
        wixBiSession: window.wixBiSession,
        pagesData: window.pagesData,
        svgShapes: window.svgShapes
    };
    siteModel.siteHeader = { id: siteModel.rendererModel.siteId, userId: siteModel.rendererModel.userId }; // required
    siteModel.siteId = siteModel.rendererModel.siteId; // required
    siteModel.viewMode = siteModel.rendererModel.previewMode ? 'preview' : 'site'; // required
    if (window.siteAsJson) {
        siteModel.pagesData = getPagesDataFromSiteAsJson(window.siteAsJson);
    }
    if (window.documentServicesModel) {
        siteModel.documentServicesModel = window.documentServicesModel;
    }
    return siteModel;
}
/*fix for ios8 bug - CLNT-2459 - will be removed when apple fix the bug
 * https://bugs.webkit.org/show_bug.cgi?id=136904
 *
 * sagi: modified to handle all mobile devices (especially fixes android's firefox and IE on win phones)
 *
 */
/*eslint strict:0 */

function fixViewport(siteModel) {
    function isMobileDevice() {
        var userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
        var patternByDevice = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
        var patternByModel = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
        return patternByDevice.test(userAgent) || patternByModel.test(userAgent.substr(0, 4));
    }

    function isOptimizedForMobileSite() {
        return siteModel.rendererModel.siteMetaData.adaptiveMobileOn;
    }

    if (isMobileDevice() && isOptimizedForMobileSite()) {
        var viewport = document.getElementById('wixMobileViewport');
        if (!viewport || !/user-scalable=no/.test(viewport.content)) {
            document.head.removeChild(viewport);
            document.write('<meta id="wixMobileViewport" name="viewport" content="width=321, user-scalable=no, maximum-scale=2.2">');
        }
    }
}
/*eslint strict:0 */

function getViewerRjsConfig (serviceTopology) {
    function joinURL() {
        var url = arguments[0];
        for (var i = 1; i < arguments.length; ++i) {
            url = url.replace(/\/$/, '') + '/' + arguments[i].replace(/^\//, '');
        }
        return url;
    }

    // Load a custom lodash build to handle JIT bug in iOS8
    // See: https://github.com/lodash/lodash/issues/799
    function getLodashPath(lodashPaths) {
        var iOS8 = window.navigator.userAgent.search(/OS 8.+like Mac.+AppleWebKit/) !== -1;
        return iOS8 ? lodashPaths.ios8 : lodashPaths.production;
    }

    var staticServerUrl = serviceTopology.staticServerUrl;
    var serviceURL = joinURL.bind(null, staticServerUrl, 'services', 'third-party');

    return {
        //By default load any module IDs from js/lib
        baseUrl: '/',
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
            modernizr: serviceURL('modernizer/2.6.2/modernizr-2.6.2.min'),
            lodash: getLodashPath({production: serviceURL('lodash/2.4.1/dist/lodash.min'), ios8: 'js/vendor/lodash/lodash-custom-ios8.min'}),
            //react: {min: 'js/vendor/react-0.13.1.addons.min', source: 'js/vendor/react-0.13.1.addons'}, react 0.13 !!!
            react: {min: serviceURL('react/0.12.2/react-with-addons.min'), source: serviceURL('react/0.12.2/react-with-addons')},
            zepto: serviceURL('zepto/1.1.3/zepto.min'),
            immutable: {min: serviceURL('immutable/3.6.2/immutable.min'), source: serviceURL('immutable/3.6.2/immutable')},
            mousetrap: serviceURL('mousetrap/1.4.6/mousetrap.min'),
            swfobject: serviceURL('swfobject/2.3.20130521/swfobject.min'),
            TweenMax: {min: serviceURL('tweenmax/1.16.1/minified/TweenMax.min'), source: serviceURL('tweenmax/1.16.1/uncompressed/TweenMax')},
            TimelineMax: {min: serviceURL('tweenmax/1.16.1/minified/TweenMax.min'), source: serviceURL('tweenmax/1.16.1/uncompressed/TweenMax')},
            ScrollToPlugin: {min: serviceURL('tweenmax/1.16.1/minified/plugins/ScrollToPlugin.min'), source: serviceURL('tweenmax/1.16.1/uncompressed/plugins/ScrollToPlugin')},
            DrawSVGPlugin: {min: serviceURL('tweenmax/1.16.1/minified/plugins/DrawSVGPlugin.min'), source: serviceURL('tweenmax/1.16.1/uncompressed/plugins/DrawSVGPlugin')},
            color: 'js/vendor/color/color',
            Q: 'js/vendor/Q/q',
            jasminetpa: 'js/vendor/jasmine/jasmine',
            jasmineext: 'js/vendor/jasmine/jasmine-ext',
            Bluebird: {min: 'js/vendor/bluebird.min', source: 'js/vendor/bluebird'},
            SoundManager: 'js/vendor/soundmanager2/soundmanager2-nodebug-jsmin',
            jjv: 'js/vendor/jjv/jjv.min'
        },
        // generated
        packages: null,
        bundles: null,
        shim: {
            lodash: { exports: '_' },
            react: { exports: 'React' },
            zepto: { exports: '$' },
            color: { exports: 'Color' },
            Q: { exports: 'Q' },
            jasminetpa: { exports: 'jasminetpa' },
            jasmineext: { exports: 'jasmineext' },
            Bluebird: { exports: 'Bluebird' },
            SoundManager: { exports: 'soundManager' },
            jjv: { exports: 'jjv' }
        },
        waitSeconds: 0
    };
}
/*globals joinURL:false */
/*eslint strict:0 */

function getFullRjsConfig(rjsConfigFunc, packagesUtil, reactVersions, artifactData, serviceTopology) {
    function normalizeUrlToVersion(version, partialUrl) {
        function isAbsoluteUrl(url) {
            return /(^\/|^http)/.test(url);
        }
        return isAbsoluteUrl(partialUrl) ? partialUrl : joinURL(version, partialUrl);
    }

    function applyVersionsObject(versionsObject) {
        function getVersionOfPath(path) {
            return versionsObject[path] || versionsObject.base;
        }

        Object.keys(config.paths).forEach(function (path) {
            config.paths[path] = normalizeUrlToVersion(getVersionOfPath(path), config.paths[path]);
        });

        config.packages.forEach(function (pkg) {
            pkg.location = normalizeUrlToVersion(getVersionOfPath(pkg.name), pkg.location);
        });
    }

    //Call with serviceTopology and all arguments after
    var config = rjsConfigFunc.apply(null, Array.prototype.slice.call(arguments, 4));

    config = packagesUtil.buildConfig(config);
    if (reactVersions) {
        reactVersions = packagesUtil.getVersionsByQuery(reactVersions);
        applyVersionsObject(reactVersions);
    }
    if (artifactData.versionsParam && artifactData.versionsParam.indexOf('http://') === 0) {
        config.baseUrl = artifactData.versionsParam.replace('/target', '');
    } else if (artifactData.baseVersionOverride.indexOf('http://') === 0) {
        config.baseUrl = artifactData.baseVersionOverride;
    } else {
        var baseUrlPath = [serviceTopology.staticServerUrl, 'services', artifactData.artifactName];
        baseUrlPath = baseUrlPath.concat(artifactData.baseVersionOverride || []);
        config.baseUrl = joinURL.apply(null, baseUrlPath);
    }
    return config;
}

/*eslint strict:0 */

function getSubdomain(domain) {
    var subDomain = domain.split('.');
    if (subDomain.length <= 2) {
        subDomain = domain;
    } else {
        var beforeLastPart = subDomain[subDomain.length - 2];
        var topLevelDomains = { com: true, org: true, net: true, edu: true, gov: true, mil: true, info: true, co: true, ac: true };
        if (topLevelDomains[beforeLastPart]) {
            subDomain = subDomain[subDomain.length - 3] + '.' + subDomain[subDomain.length - 2] + '.' + subDomain[subDomain.length - 1];
        } else {
            subDomain = subDomain[subDomain.length - 2] + '.' + subDomain[subDomain.length - 1];
        }
    }
    return subDomain;
}
/*eslint strict:0 */

function render(isServerSide, isPreview, contentCache, queryUtil, siteModel, wixBiSession) {
    var performanceNow = (function () {
        var performance = window.performance;
        return performance && performance.now ?
            function () {
                return performance.now();
            } : function () {
            return Date.now();
        };
    }());

    function addConditionalDependencies(pkgs) {
        function shouldLoadPackageFor(applicationType) {
            var map = (siteModel.rendererModel || window.rendererModel).clientSpecMap;

            for (var applicationId in map) {
                if (map.hasOwnProperty(applicationId) && map[applicationId].type === applicationType) {
                    return true;
                }
            }

            return false;
        }

        var isQaAutomation = queryUtil.isParameterTrue.bind(queryUtil, 'isqa');
        var isTpaIntegration = queryUtil.isParameterTrue.bind(queryUtil, 'isTpaIntegration');

        function isWixDomain() {
            return location.hostname === 'www.wix.com';
        }

        function isWixSites() {
            return isWixDomain() || queryUtil.isParameterTrue('iswixsite');
        }

        function isWixCloud() {
            return shouldLoadPackageFor('siteextension');
        }

        if (isPreview) {
            pkgs.push('immutable');
        }
        if (isQaAutomation()) {
            pkgs.push('qaAutomation');
        }
        if (isWixSites()) {
            pkgs.push('wixSites');
        }
        if (isTpaIntegration()) {
            pkgs.push('Q', 'jasminetpa', 'tpaIntegration');
        }
        if (isWixCloud()) {
            pkgs.push('cloud');
        }
    }

    function load(pkgs, callback) {
        /*
         * Require all needed packages (static + conditional)
         * Then do initial site render (or re-layout if it was rendered by the server)
         */
        function getAjaxHandler($) {
            var isXhrWithCredentials = (function () {
                try {
                    var xhr = new XMLHttpRequest();
                    return "withCredentials" in xhr;
                } catch (e) {
                    return false;
                }
            }());

            function setCallbacks(xhr, options) {
                xhr.onerror = function (e) {
                    if (options.error) {
                        options.error(e);
                    }
                };
                xhr.onload = function () {
                    if (options.success) {
                        var response = null;
                        try {
                            response = JSON.parse(xhr.responseText);
                        } catch (e) {
                            response = xhr.responseText;
                        }
                        options.success(response);
                    }
                };
            }

            function simResponse(content, options) {
                options.success.call(options.context || window, content);
            }

            function canUseCache(options) {
                return options.dataType === 'json' && (!options.type || options.type.toUpperCase() === 'GET');
            }

            function error(msg) {
                try {
                    console.error(msg);
                } catch (e) {
                    // empty
                }
            }

            return function ajax(options) {
                var cachedContent = contentCache[options.url];
                if (cachedContent && canUseCache(options)) {
                    simResponse(cachedContent, options);
                } else if (isXhrWithCredentials) {
                    contentCache[options.url] = false;
                    $.ajax.apply($, arguments);
                } else if (typeof XDomainRequest !== 'undefined') {
                    /*globals XDomainRequest:true*/
                    var xhr = new XDomainRequest();
                    var httpMethod = options.type || 'GET';
                    xhr.open(httpMethod, options.url);
                    setCallbacks(xhr, options);
                    xhr.setRequestHeader = function () {
                    }; // ignores request headers in IE (not supported)
                    xhr.send();
                } else {
                    error('XHR cors not supported, and neither is XDR');
                }
            };
        }

        addConditionalDependencies(pkgs);
        requirejs(pkgs, function () {
            wixBiSession.packagesLoaded = Date.now();

            function buildFunctionParametersObject(_pkgs, args) {
                return _pkgs.reduce(function (result, pkg, index) {
                    result[pkg] = args[index];
                    return result;
                }, {});
            }

            function initConditionalDependencies(_pkgs) {
                if (_pkgs.qaAutomation) {
                    _pkgs.qaAutomation.init(window);
                }
                if (_pkgs.tpaIntegration) {
                    _pkgs.tpaIntegration.init(window);
                }
            }

            var p = buildFunctionParametersObject(pkgs, arguments);
            initConditionalDependencies(p);

            var ajaxHandler = getAjaxHandler(p.zepto);
            p.utils.ajaxLibrary.register(ajaxHandler);
            p.utils.ajaxLibrary.enableJsonpHack();

            // Wait for DOM to be ready before accessing it, e.g. getElementById
            p.zepto(function () {
                if (siteModel.wixData) {
                    var siteStructureNode = document.getElementById('SITE_STRUCTURE');
                    siteModel.wixHtmlRaw = siteStructureNode.outerHTML;
                    siteModel.wixAnchors = window.anchors || {};
                    siteStructureNode.parentNode.removeChild(siteStructureNode);
                }

                siteModel.requestModel = {
                    userAgent: window.navigator.userAgent,
                    cookie: document.cookie,
                    storage: p.utils.storage(window)
                };
                siteModel.currentUrl = p.utils.urlUtils.parseUrl(location.href);
                siteModel.forceMobileView = window.forceMobileView;

                callback(p, ajaxHandler);
            });
        });
    }

    function renderClientSide() {
        var clientSidePackages = ['skins', 'components', 'core', 'react', 'utils', 'lodash', 'TweenMax',
            'wixappsCore', 'wixappsClassics', 'layout', 'tpa', 'zepto', 'TimelineMax', 'ScrollToPlugin', 'wixappsBuilder',
            'fonts', 'animations', 'color', 'swfobject', 'mousetrap'];
        if (queryUtil.isParameterTrue('ds') || isPreview) {
            clientSidePackages.push('documentServices', 'componentsPreviewLayer');
        }
        load(clientSidePackages,
            function (p, ajaxHandler) {
                if (siteModel.pagesData) {
                    var _ = p.lodash;
                    var pageIds = _(siteModel.pagesData).keys().pull('masterPage').value();
                    siteModel.pagesData = _.mapValues(siteModel.pagesData, function (data, pageId) {
                        // don't fix pages from the server
                        if (window.pagesData && window.pagesData[pageId]) {
                            return data;
                        }
                        return p.utils.dataFixer.fix(data, pageIds.slice());
                    });
                }
                p.core.renderer.renderSite(siteModel, ajaxHandler, function (renderedReact) {
                    if (window.rendered) {
                        window.rendered.forceUpdate();
                    } else {
                        var a = document.getElementById("SITE_CONTAINER").children[0];
                        window.rendered = p.react.render(renderedReact, document.getElementById("SITE_CONTAINER"));
                        var b = document.getElementById("SITE_CONTAINER").children[0];
                        window.sssr.success = (a === b);

                        window.sssr.clientSideRender = {
                            sinceInitialTimestamp: (Date.now() - window.wixBiSession.initialTimestamp),
                            performanceNow: performanceNow()
                        };

                        window.onpopstate = window.rendered.onPopState;

                        if (p.documentServices) {
                            var siteData = window.rendered.props.siteData;
                            window.documentServices = new p.documentServices.Site(p.documentServices.configs.fullFunctionality, {
                                jsonData: siteData,
                                dataLoadedRegistrar: siteData.store.registerDataLoadedCallback.bind(siteData.store)
                            }, window.rendered);

                            if (window.parent) {
                                window.rendered.registerAspectToEvent('siteReady', function () {
                                    window.parent.postMessage('documentServicesLoaded', '*');
                                });
                            }
                        }
                    }
                });
            });
    }

    function renderServerSide() {
        load(['layout', 'utils', 'zepto', 'lodash', 'fonts', 'color'],
            function (p, ajaxHandler) {
                var getDomNode = function () {
                    var domId = p.lodash.toArray(arguments).join('');
                    return document.getElementById(domId);
                };
                var siteData = new p.utils.SiteData(siteModel, ajaxHandler);
                siteData.currentPageInfo = p.utils.wixUrlParser.parseUrl(siteData, siteData.currentUrl.full);
                var currentPage = siteData.currentPageInfo.pageId;
                var requests = p.utils.pageRequests(siteData, siteData.currentPageInfo);
                siteData.store.loadBatch(requests, function () {
                    var structuresDesc = {
                        inner: {
                            structure: siteData.pagesData[currentPage].structure,
                            pageId: currentPage,
                            getDomNodeFunc: getDomNode
                        },
                        outer: {
                            structure: siteData.pagesData.masterPage.structure,
                            getDomNodeFunc: getDomNode
                        }
                    };
                    p.layout.reLayout(structuresDesc, siteData);
                    getDomNode('SITE_STRUCTURE').style.visibility = '';
                    getDomNode(siteData.currentPageInfo.pageId).style.visibility = '';
                    window.sssr.serverSideRender = {
                        sinceInitialTimestamp: (Date.now() - window.wixBiSession.initialTimestamp),
                        performanceNow: performanceNow()
                    };
                    renderClientSide();
                });
            });
    }

    // Server side render state
    window.sssr = {};

    if (isServerSide) {
        renderServerSide();
    } else {
        renderClientSide();
    }
}

////////////////////////////////////////////////////////////////////////
// requirejs main-r will be generated from this file
////////////////////////////////////////////////////////////////////////
/*eslint enforce-package-access:0*/
/*globals packagesUtil:true, instrument:false, queryUtil:false, prefetchPages:false, convertSiteModel:false, fixViewport:false, getFullRjsConfig:false, getViewerRjsConfig:false, getSubdomain:false, render:false, convertRendererModel: false, joinURL:false*/

    var wixBiSession = window.wixBiSession || {};
    window.wixBiSession = wixBiSession;
    wixBiSession.mainLoaded = Date.now();
    wixBiSession.et = 1;

    var siteModel = window.siteModel || {};
    var publicModel = window.publicModel || siteModel.publicModel;
    var serviceTopology = siteModel.serviceTopology || window.serviceTopology || {};
    var reactVersions = packagesUtil.getVersionsByQuery(window.reactVersions);

    if (!siteModel.publicModel) {
        var rendererModel = convertRendererModel(window.rendererModel, publicModel);
        siteModel = convertSiteModel(rendererModel, publicModel);
        window.siteModel = siteModel;
    }

    instrument(serviceTopology, wixBiSession, queryUtil, siteModel, publicModel);
    wixBiSession.beat(4);

    var contentCache = {};
    if (publicModel) {
        contentCache = prefetchPages(publicModel);
    }

    fixViewport(siteModel);
    var reactSource = queryUtil.getParameterByName('ReactSource');
    var config = getFullRjsConfig(getViewerRjsConfig,
                                  packagesUtil,
                                  reactVersions,
                                  {
                                      versionsParam: queryUtil.getParameterByName('SantaVersions'),
                                      baseVersionOverride: reactSource,
                                      artifactName: 'santa'
                                  },
                                  serviceTopology);

    if (!siteModel.santaBaseFallbackUrl) {
        siteModel.santaBaseFallbackUrl = (serviceTopology.staticServerFallbackUrl || 'https://fallback.wix.com/') + '/services/santa/' + (reactVersions ? reactVersions.base : '');
    }
    if (!siteModel.santaBase) {
        siteModel.santaBase = window.reactVersions ? joinURL(config.baseUrl, window.reactVersions.base) : config.baseUrl;
    }
    siteModel.baseVersion = reactSource || (window.reactVersions && window.reactVersions.base);
    requirejs.config(config);

    try {
        document.domain = getSubdomain(document.domain);
    } catch (e) {
        // empty
    }

    window.isPreview = queryUtil.isParameterTrue.bind(packagesUtil, 'isEdited');
    var isPreview = queryUtil.isParameterTrue('isEdited');
    var isServerSide = !(window.clientSideRender || window.location.hash || isPreview);
    render(isServerSide, isPreview, contentCache, queryUtil, siteModel, wixBiSession);

}; startRender();