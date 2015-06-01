define("wixappsBuilder/core/dataSelectorFactory",["lodash","utils","wixappsCore"],function(a,b,c){"use strict";function f(b,c){var d=b.payload.items||[b.payload.item];return a.each(d,function(a){c[a._iid]=a}),c}function g(c,g,h,i,j,k,l){g=a.defaults(g,{type:h,applicationInstanceId:i.instanceId,applicationInstanceVersion:j,skip:0,sort:{},limit:null,filter:{}});var m={consistentRead:"true"},n=e.getSiteDataDestination(i.type).concat(["items",h]),o=b.urlUtils.baseUrl(c.currentUrl.full)+"/apps/appBuilder/1/editor/Query?"+d.toQueryString(m),p={url:o,force:!0,destination:n,data:g,transformFunc:function(a,b){return a.success?(k(),f(a,b)):(l(),b)},error:l};return p}function h(b,c,d,e){return{getRequest:function(a,f,h){var i={filter:{_iid:{$in:b.itemIds}}};return g(c,i,b.forType,d,e,f,h)},getData:function(){return a.map(b.itemIds,function(a){return[b.forType,a]})}}}function i(a,g,h,i){return{getRequest:function(j,k,l){var m=c.wixappsUrlParser.getPageSubItemId(g,j),n={applicationInstanceId:h.instanceId,applicationInstanceVersion:i,itemId:m},o={consistentRead:"true"},p="viewer",q=e.getSiteDataDestination(h.type).concat(["items",a.forType]),r=b.urlUtils.baseUrl(g.currentUrl.full)+"/apps/appBuilder/1/"+p+"/ReadItem?"+d.toQueryString(o);return{url:r,force:!0,destination:q,data:n,transformFunc:function(a,b){return k(),f(a,b)},error:l}},getData:function(){var b=c.wixappsUrlParser.getPageSubItemId(g);return b?[a.forType,b]:[]}}}function j(b){var c={},d=b.sortField||"title",e=a.has(b,"sortAscending")?b.sortAscending:!0;return c[d]=e?1:0,c}function k(b,c,d,f){var h=a.clone(b);return{getRequest:function(b,e,i){var k=h.tagIds;if(0===k.length)return e(),null;var l={filter:{_tags:k.length>1?{$in:k}:a.first(k)},sort:j(h)};return g(c,l,h.forType,d,f,e,i)},getData:function(){var b=e.getDataByPath(c,"appbuilder",[h.forType]),d=a(b).filter(function(b){return a.intersection(b._tags,h.tagIds).length>0}).sortBy(h.sortField).map(function(a){return[a._type,a._iid]}).value();return h.sortAscending?d:a.reverse(d)},setTags:function(a,b){h.tagIds=a;var d=this.getRequest();if(d){var e=c.store;e.loadBatch([d],b)}else b()}}}function l(a,b,c,d){switch(a.logicalTypeName){case"IB.ManualSelectedList":return h(a,b,c,d);case"IB.PageSelectedItem":return i(a,b,c,d);case"IB.TagsFilteredList":return k(a,b,c,d);default:throw"Data selector of type: "+a.logicalTypeName+" is not implemented."}}var d=b.urlUtils,e=c.wixappsDataHandler;return{getDataSelector:l}}),define("wixappsBuilder/core/appRepo",["lodash","wixappsBuilder/core/dataSelectorFactory","wixappsCore"],function(a,b,c){"use strict";function d(a,c,d,f,g){var h=e(a,c);return h?b.getDataSelector(h,d,f,g):null}function e(a,b){var c=f(a,b);if(!c)return null;var d=c.dataSelector||c.dataSelectorDef&&c.dataSelectorDef.id;return a.dataSelectors[d]}function f(a,b){return a.parts&&a.parts[b]}function g(a,b,d,e){var f=[d,b,e].join("|"),g=[d,b].join("|"),h=a.views[f]||a.views[g];return h&&c.viewsUtils.fillViewDefMissingIDs(h),h}return{getDataSelector:d,getAppPartDefinition:f,getViewDef:g,getDataSelectorDefinition:e}}),define("wixappsBuilder/util/appbuilderUrlUtils",[],function(){"use strict";function a(a,c){var d="",e=c.serviceTopology.scriptsLocationMap;if(e&&e.wixapps&&(d=e.wixapps+"/"),a&&d){var f=a.match(/^(http:\/\/)?(images\/.*)/);if(f)return b(d,f[2])}return a}function b(a,b){return(a.length>0&&"/"===a[a.length-1]?a:a+"/")+(b.length>0&&"/"===b[0]?b.substr(1):b)}return{resolveResourcePath:a,combinePath:b}}),define("wixappsBuilder/logics/appPart2Presenter",["lodash","wixappsCore"],function(a,b){"use strict";function e(a){this.partApi=a}var c=b.localizer,d=b.wixappsLogger;return e.prototype={getViewVars:function(){if(!this.userTags){this.userTags={enabled:!1,items:[{value:"",text:""}],selectedValue:""};var b=this.partApi.getAppPartDefinition().dataSelectorDef;if(b){var d=this.partApi.getRepo(),e=d.dataSelectors[b.id];"IB.TagsFilteredList"===e.logicalTypeName&&b.predefinedSettings&&(this.userTags.items=a.map(b.predefinedSettings.tags,function(a){return{value:a,text:d.tags[a]}}),this.userTags.items.unshift({value:"all",text:c.localize("@FILTER_DIALOG_All_Tags@",this.partApi.getLocalizationBundle())}),this.userTags.selectedValue=b.predefinedSettings.selectedTag,this.userTags.enabled=!0)}}return{userTags:this.userTags}},onTagChanged:function(a){var b=this.partApi.getDataSelector(),c=this.partApi.getAppPartDefinition().dataSelectorDef,e="all"===a.payload.value?c.predefinedSettings.tags:[a.payload.value];this.partApi.setCssState("loading"),this.userTags.selectedValue=a.payload.value,b.setTags(e,function(){this.partApi.setCssState("content"),d.reportEvent(this.partApi.siteData,d.events.TAG_SELECTED_IN_VIEWER)}.bind(this))}},e}),define("wixappsBuilder/comps/appPart2",["lodash","core","wixappsCore","wixappsBuilder/core/appRepo","wixappsBuilder/util/appbuilderUrlUtils","wixappsBuilder/logics/appPart2Presenter"],function(a,b,c,d,e,f){"use strict";function h(a,b,c,d,e){a&&(b?g.reportError(c,d,e):g.reportEvent(c,d,e))}function i(){var a=this.getRepo(),b=d.getAppPartDefinition(a,this.props.compData.appPartName),c=this.props.siteData.getClientSpecMapEntry(this.props.compData.appInnerID),e=d.getDataSelector(a,this.props.compData.appPartName,this.props.siteData,c,a.applicationInstanceVersion);return b&&e?!0:(h(this.oneTimerIndicator,!0,this.props.siteData,g.errors.APP_PART2_FAILED_TO_LOAD),!1)}function j(){var a=this.props.compData,b=this.props.siteData.getClientSpecMapEntry(a.appInnerID),c=this.getDataAspect(),e=c.getDescriptor(this.getPackageName());return d.getDataSelector(this.getRepo(),a.appPartName,this.props.siteData,b,e.applicationInstanceVersion)}function k(){var a=this.props.compData,b=this.props.siteData.getClientSpecMapEntry(a.appInnerID),c=this.getDataAspect();return c.getMetadata(b.type,a.appPartName)}function l(){var a=k.call(this);if(a.loading)return{$displayMode:"loading"};if(a.error)return{$displayMode:"error"};var b={$displayMode:"content",itsDeadJim:!i.call(this)};return this.state&&this.state.$displayMode&&b.$displayMode!==this.state.$displayMode&&this.registerReLayout(),b}var g=c.wixappsLogger;return{displayName:"AppPart2",mixins:[c.viewsRenderer,b.compMixins.skinBasedComp],getInitialState:function(){var a=l.call(this);return"content"!==a.$displayMode||a.itsDeadJim||this.dataSelector||(this.dataSelector=j.call(this)),a},componentWillReceiveProps:function(){if(!this.state.itsDeadJim){var a=l.call(this);"content"===a.$displayMode&&(this.dataSelector=j.call(this)),this.registerReLayout(),this.setState(a)}},componentWillMount:function(){this.oneTimerIndicator=!0,this.logic=new f(this.getPartApi())},componentDidMount:function(){this.oneTimerIndicator=!1},getPartApi:function(){return{getAppPartDefinition:this.getAppPartDefinition,getRepo:this.getRepo,getPartData:this.getRootDataItemRef,getDataAspect:this.getDataAspect,getLocalizationBundle:this.getLocalizationBundle,getDataSelector:function(){return this.dataSelector}.bind(this),registerReLayout:this.registerReLayout,siteData:this.props.siteData,setCssState:this.setCssState}},setCssState:function(a){this.state.$displayMode!==a&&this.registerReLayout(),this.setState({$displayMode:a})},getViewDef:function(a,b,c){var e=this.getDataAspect(),f=e.getDescriptor(this.getPackageName());return d.getViewDef(f,a,b,c)},getLocalizationBundle:function(){return{FILTER_DIALOG_All_Tags:"All"}},getRepo:function(){var a=this.getDataAspect();return a.getDescriptor(this.getPackageName())},getAppPartDefinition:function(){return d.getAppPartDefinition(this.getRepo(),this.props.compData.appPartName)},getViewName:function(){return this.getAppPartDefinition().viewName},resolveResourcePath:e.resolveResourcePath,getRootDataItemRef:function(){return this.dataSelector&&this.dataSelector.getData()},getSkinProperties:function(){if(this.state.itsDeadJim)throw"AppPart data is not valid.";if("content"===this.state.$displayMode){var b=this.renderView(),c=a.clone(this.props.style||{});return c.height="auto",h(this.oneTimerIndicator,!1,this.props.siteData,g.events.APP_BUILDER_PART_LOADED,{appPartName:this.props.compData.appPartName,userId:this.props.siteData.rendererModel&&this.props.siteData.rendererModel.userId}),{"":{style:c},inlineContent:{children:b}}}return{}}}}),define("wixappsBuilder/proxies/fieldBoxProxy",["wixappsCore","lodash"],function(a,b){"use strict";function c(a){var c=["width","box-flex","flex"];return b.every(c,function(b){return!a[b]})}function d(a){var c=["VSpacer","HSpacer"];return b.some(a.items,function(a){return!b.contains(c,a.comp.name)})}function e(a){var c=b.filter(a.comp.items,function(a){var b=this.getCompProp("width-mode",a);return b?"manual"===b:void 0!==this.getCompProp("width",a)},this);return b.isEmpty(c)?200:b(c).map(function(a){var b=this.getCompProp("spacers",a);return this.getCompProp("width",a)+(b["xax-before"]||0)+(b["xax-after"]||0)},this).max().value()}function f(a){return!this.getCompProp("hidden",a)}return{mixins:[a.baseCompositeProxy],statics:{getRequiredParentViewDefProps:function(){return["layout"]}},renderProxy:function(){var a=this.getCompProp("orientation"),g=b.cloneDeep(this.props.viewDef),h=g.comp;if(h.items=b.filter(h.items,b.bind(f,this)),h.name="vertical"===a?"VBox":"HBox",h.css=h.css||{},"horizontal"===this.props.orientation&&"vertical"===a&&c(this.props.parentProps.layout)&&d.call(this,h)){var i=e.call(this,g);b.has(g,"layout")&&b.has(g.layout,"min-width")&&(g.layout["min-width"]=i),h.css.width=i}else h.css.width="auto";return this.renderChildProxy(g)}}}),define("wixappsBuilder/util/fieldProxyUtils",["wixappsCore","lodash"],function(a,b){"use strict";function c(a){return{css:{"box-align":a}}}function d(a){return"vertical"===a?"horizontal":"vertical"}function e(a){return a=a||{},{spacerBefore:a["xax-before"]||0,spacerAfter:a["xax-after"]||0}}function f(a){return a=a||{},{spacerBefore:a.before||0,spacerAfter:a.after||0}}function g(c,g,h){var i=f(g),j=a.spacersCalculator.translateStaticSpacers(i,c,h),k=e(g),l=a.spacersCalculator.translateStaticSpacersXax(k,d(c),h);return b.merge(j,l)}function h(a,b){return a?{comp:{name:"AppLink",pageId:a,items:[]}}:b&&"wix:LinkBase"!==b._type?{value:b,comp:{name:"Link",items:[]}}:void 0}return{getSpacers:g,getBoxAlignment:c,getLinkViewDef:h}}),define("wixappsBuilder/proxies/mixins/baseFieldProxy",["wixappsCore","lodash","react","utils","wixappsBuilder/util/fieldProxyUtils"],function(a,b,c,d,e){"use strict";function f(){var a=this.getCompProp("items")[0];if(a.link)return a.link;var b=this.getViewDefProp("data",a)||this.getViewDefProp("data");return this.getDataByPath("links."+b)}function g(){var a=this.proxyData,c=b.cloneDeep(this.props.viewDef),d=c.comp,g=this.getCompProp("items",c);if(!g||1!==g.length)throw"Field proxy accepts exactly one child";var h=this.props.orientation,i="vertical"===h;this.adjustViewDefs&&this.adjustViewDefs(c,g[0]),d.name=i?"VBox":"HBox",d.hidden=this.shouldHide(a);var j=this.getItemLayout();b.keys(j).length&&(g[0].layout=b.merge(g[0].layout||{},j));var k=e.getLinkViewDef(this.getCompProp("pageLink"),f.call(this));k&&(k.layout=b.cloneDeep(g[0].layout),k.comp.items.push(g.pop()),g.push(k));var l=e.getSpacers(h,this.getCompProp("spacers"),this.getVar("partDirection"));return c.layout=b.merge(c.layout||{},l),c}return{mixins:[a.baseCompositeProxy],getCustomStyle:function(){var a={};return this.getCompProp("box-align")&&(a["box-align"]=this.getCompProp("box-align")),a},renderProxy:function(){var a=g.call(this),b=this.getChildCompProps();if("horizontal"===this.props.orientation){var e={flex_display:!0,flex_vbox:!0};b.className&&(e[b.className]=!0),b.className=d.classNames(e)}return c.DOM.div(b,this.renderChildProxy(a))}}}),define("wixappsBuilder/proxies/fieldProxy",["wixappsBuilder/proxies/mixins/baseFieldProxy","lodash"],function(a,b){"use strict";var c={"wix:Image":function(a){return b.isEmpty(a.src)||"http://images/noimage.png"===a.src},String:function(a){return b.isEmpty(a)},"wix:Video":function(a){return b.isEmpty(a.videoId)||"YOUTUBE"===a.videoType&&"xLk7JoPDx4Q"===a.videoId}};return{mixins:[a],shouldHide:function(a){var d=b.isString(a)?"String":a._type,e=c[d];return e&&e(a)},getItemLayout:function(){var a=this.getCompProp("width")||100,b=this.getCompProp("height")||100,c=this.getCompProp("layout")&&this.getCompProp("layout")["min-width"]||0,d=this.getCompProp("heightMode")||"manual";return{width:c>a?c:a,"min-width":c,height:"manual"===d?b:"auto"}}}}),define("wixappsBuilder/proxies/textFieldProxy",["wixappsBuilder/proxies/mixins/baseFieldProxy","lodash"],function(a,b){"use strict";function f(){var a=this.getCompProp("height-mode")||"auto",b=this.getCompProp("min-height")||100,c=this.getCompProp("height");return"auto"===a?{height:"auto"}:"max-chars"===a?{"min-height":b}:"fixed-height"===a?{"min-height":0,height:c||d,"overflow-y":"hidden"}:"pixels"===a?{height:c||d}:{}}function g(){var a="manual"===this.getCompProp("width-mode"),b=this.getCompProp("width"),d=this.props.orientation;return a?{width:b||c}:"vertical"===d?{width:"100%"}:{"box-flex":"1 1 auto"}}function h(a){var c=this.getCompProp("height-mode")||"auto",d=this.getCompProp("min-lines")||0,e=this.getCompProp("max-lines")||0;e>0&&d>e&&(e=d);var f=this.getCompProp("max-chars")||100;a.comp.name="wix:Date"===this.proxyData._type?"Date":"Label","auto"===c?a.comp.singleLine=!1:"lines"===c?0===d&&1===e&&b.isString(this.proxyData)?a.comp.singleLine=!0:e>0&&(a.comp.name="ClippedParagraph",a.comp.minLines=d,a.comp.maxLines=e):"max-chars"===c?(a.comp.name="ClippedParagraph2",a.comp["max-chars"]=f):"pixels"===c&&(a.comp.name="ClippedParagraph",a.comp.minLines=0,a.comp.maxLines=0)}function i(a){var b=this.props.orientation;"horizontal"===b&&(a.layout=a.layout||{},a.layout["max-width"]=this.getCompProp("width")||c)}var c=150,d=150,e={"wix:RichText":function(a){return!a.text},String:function(a){return!a},"wix:Date":function(a){return!a.iso}};return{mixins:[a],shouldHide:function(a){var c=b.isString(a)?"String":a._type,d=e[c];return d&&d(a)&&0===(this.getCompProp("min-lines")||0)},adjustViewDefs:function(a,b){i.call(this,a),h.call(this,b)},getItemLayout:function(){return b.merge(g.call(this),f.call(this))}}}),define("wixappsBuilder/util/views",[],function(){"use strict";return{paginatedListTemplate:{name:"PaginatedListTemplate3",forType:"Array",vars:{itemSpacing:10,paginationColor:"color_15"},comp:{name:"VBox","box-align":"center",items:[{comp:{name:"HBox",hidden:{$expr:"not($userTags.enabled)"},items:[{data:"$userTags",comp:{name:"ComboBox",cssClass:"comboBox",skin:"wysiwyg.viewer.skins.input.ComboBoxInputSimpleSkin",events:{selectionChanged:"onTagChanged"}},layout:{width:165,"vertical-align":"middle",spacerBefore:"*"}}]},layout:{width:"100%",spacerBefore:"20px",spacerAfter:"30px"}},{id:"paginatedlist",comp:{name:"PaginatedList",hidden:{$expr:"eq(Array.length(this), 0)"},hidePagination:"true",itemsPerPage:"10",templates:{item:{data:"$positionInParent",comp:{name:"SwitchBox",cases:{"default":[{id:"listItem",comp:{name:"LIST_ITEM"}},{id:"footerSpacer",comp:{name:"VSpacer",size:{$expr:"$itemSpacing"}}},{id:"gutterLine",comp:{name:"HorizontalLine"},layout:{spacerAfter:{$expr:"$itemSpacing"}}}],last:[{id:"listItem",comp:{name:"LIST_ITEM"}},{comp:{name:"VBox",hidden:"true",items:[{id:"footerSpacer",comp:{name:"VSpacer",size:{$expr:"$itemSpacing"}}},{id:"gutterLine",comp:{name:"HorizontalLine"},layout:{spacerAfter:{$expr:"$itemSpacing"}}}]}},{comp:{name:"VSpacer",size:"9"}},{id:"paginationNavigationBox",comp:{name:"HBox",hidden:{$expr:"$hidePagination"},"box-align":"center",items:[{comp:{name:"HSpacer",size:"*"}},{value:"◄",comp:{name:"Label",cssClass:"paginationPrev",events:{"dom:click":"prevPageClicked"}},layout:{spacerAfter:4}},{value:{$expr:"String.concat($currentPage,'/',$maxPage)"},comp:{name:"Label"},layout:{spacerAfter:4}},{value:"►",comp:{name:"Label",cssClass:"paginationNext",events:{"dom:click":"nextPageClicked"}}},{comp:{name:"HSpacer",size:"*"}}]},layout:{position:"relative"}}]},css:{"min-width":"100%"}}}}},layout:{width:"100%"}},{id:"noItemsLabel",value:"@LIST_SETTINGS_PANEL_NoItemsMessagePlaceholder@",comp:{name:"Label",hidden:{$expr:"gt(String.length(this), 0)"}}}],editorData:{isPaginated:!0,hasTags:!0}},stylesheet:[{".paginationPrev, .paginationNext":{padding:"0 5px",display:"inline-block","font-size":"14px",cursor:"pointer",color:{$expr:"Theme.getColor($paginationColor)"},"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"}},{".comboBox select":{"font-size":"14px"}}],customizations:[{priority:105,fieldId:"paginatedlist",key:"comp.hidePagination",input:{name:"checkbox",falseVal:"true",label:"@LIST_SETTINGS_PANEL_UsePagination@",defaultVal:"true",trueVal:"false",spaceAfter:"10"}},{priority:105,fieldId:"paginatedlist",key:"comp.itemsPerPage",input:{name:"slider",maxVal:"120",minVal:"1",label:"@LIST_SETTINGS_PANEL_ItemsPerPage@",spaceAfter:"20",hiddenwhen:{fieldId:"paginatedlist",key:"comp.hidePagination",value:"true"}}},{priority:100,fieldId:"vars",key:"itemSpacing",input:{name:"slider",maxVal:"300",minVal:"0",label:"@LIST_SETTINGS_PANEL_ItemSpacing@",spaceAfter:"20"}},{priority:95,fieldId:"gutterLine",key:"comp.hidden",input:{name:"checkbox",falseVal:"true",label:"@LIST_SETTINGS_PANEL_ShowDivider@",defaultVal:"false",trueVal:"false"}},{priority:90,fieldId:"gutterLine",key:"comp.style",input:{name:"changestyle",showAs:"link",label:"@LIST_SETTINGS_PANEL_ChangeStyle@",spaceAfter:"20"}}]},blankItemTemplate:{name:"BlankList",forType:"BlankType",comp:{name:"VBox",items:[{id:"Top",comp:{name:"FieldBox",orientation:"horizontal",editorData:{labelPosition:"none",alignment:"left"}}},{id:"topSpacer",comp:{name:"VSpacer",size:"0"}},{comp:{name:"HBox",items:[{id:"Left",comp:{name:"FieldBox",orientation:"vertical",editorData:{labelPosition:"none",alignment:"left",spacers:{before:3,after:0,"xax-before":0,"xax-after":0}}},layout:{spacerAfter:0}},{id:"leftToCenterSpacer",comp:{name:"HSpacer",size:"0"}},{id:"Center",comp:{name:"FieldBox",orientation:"vertical",pack:"center",items:[{id:"text_1",data:"title",comp:{name:"TextField","box-align":"center",width:"200","width-mode":"auto",items:[{id:"text_1_proxy",data:"title",comp:{name:"Label",style:"Body L",bold:"true"},layout:{"text-align":"center"}}],spacers:{before:0,after:10}}}],editorData:{labelPosition:"none",alignment:"left"}},layout:{"box-flex":1}},{id:"centerToRightSpacer",comp:{name:"HSpacer",size:"0"}},{id:"Right",comp:{name:"FieldBox",orientation:"vertical",pack:"center",editorData:{labelPosition:"none",alignment:"left",spacers:{before:0,after:0,"xax-before":10,"xax-after":0}}}}]}},{id:"Bottom",comp:{name:"FieldBox",orientation:"vertical",editorData:{labelPosition:"none",alignment:"left"}},layout:{"box-flex-pack":"start"}},{id:"bottomSpacer",comp:{name:"VSpacer",size:"0"}}]}}}}),define("wixappsBuilder/core/appPart2DataFetchingStateManager",["wixappsCore"],function(a){"use strict";function c(a,c){b.setPackageMetadata({loading:!0},a,c.type)}function d(a,c){b.setPackageMetadata({loading:!1},a,c.type)}function e(a,c){d(a,c),b.setPackageMetadata({error:!0},a,c.type)}function f(a,c,d){b.setCompMetadata({loading:!0},a,c.type,d)}function g(a,c,d){b.setCompMetadata({loading:!1},a,c.type,d)}function h(a,c,d){g(a,c,d),b.setCompMetadata({error:!0},a,c.type,d)}function i(a,c,d){var e=b.getCompMetadata(a,c.type,d);return e.loading===!1&&!e.error}function j(a,c){var d=b.getPackageMetadata(a,c.type);return d.loading===!1&&!d.error}function k(a,c,d){var e=b.getCompMetadata(a,c.type,d);return!!e.error}function l(a,c){var d=b.getPackageMetadata(a,c.type);return!!d.error}var b=a.wixappsDataHandler;return{clearPackageLoadingState:d,setPackageAsErroneous:e,clearPartLoadingState:g,setPartAsErroneous:h,setPartLoadingState:f,setPackageLoadingState:c,hasPartLoadedSuccessfully:i,hasPackageLoadedSuccessfully:j,isPartErroneous:k,isPackageErroneous:l}}),define("wixappsBuilder/core/builderDataHandler",["lodash","utils","wixappsCore","wixappsBuilder/util/views","wixappsBuilder/core/appRepo","wixappsBuilder/core/appPart2DataFetchingStateManager"],function(a,b,c,d,e,f){"use strict";function k(b,c){return c.views=a.transform(c.views,function(b,c){var d=a.compact([c.forType,c.name,c.format]).join("|");b[d]=c},{}),c.dataSelectors=a.transform(c.dataSelectors,function(a,b){a[b.id]=b},{}),c.types=a.transform(c.types,function(a,b){a[b.name]=b},{}),c.offsetFromServerTime=new Date-new Date(c.serverTime),l(b,c),c}function l(b,c){var e=b.isMobileView()?"Mobile":"";a.each(c.parts,function(f){var g=f.dataSelector||f.dataSelectorDef&&f.dataSelectorDef.id;c.dataSelectors[g]||j.reportEvent(b,j.events.APP_PART2_FAILED_TO_LOAD_DATA_SELECTOR,{dataSelector:f.dataSelector});var i=a.compact([f.type,f.viewName,e]).join("|"),k=a.compact(["Array",f.viewName,e]).join("|");if(!c.views[k]){c.views[k]=a.clone(d.paginatedListTemplate),c.views[k].name=f.viewName,c.views[k].forType="Array",c.views[k].format=e;var l=h.filter(c.views[k],function(a){return"listItem"===a.id});a.each(l,function(a){a.comp.name=f.viewName})}c.views[i]||(c.views[i]=a.clone(d.blankItemTemplate),c.views[i].name=f.viewName,c.views[i].forType=f.type,c.views[i].format=e)}),a.each(c.dataSelectors,function(c){if(c.itemIds&&c.itemIds.length){var d=a.compact(c.itemIds);d.length!==c.itemIds.length&&(j.reportError(b,j.errors.DATA_SELECTOR_CONTAINS_NULL),c.itemsIds=d)}c.hiddenItemIds&&c.hiddenItemIds.length&&(c.itemIds=a.difference(c.itemIds,c.hiddenItemIds))}),a.each(c.views,function(b){var c=h.filter(b,function(b){return a.isPlainObject(b)&&a.has(b,"color")&&a.has(b.color,"$expr")&&/Theme\.getColor\([^)]*/.test(b.color.$expr)});a.each(c,function(a){delete a.color})})}function m(a){return a=a||{},a.views=a.views||{},a.types=a.types||{},a.dataSelectors=a.dataSelectors||{},a.parts=a.parts||{},a}function n(b,c,d){if(!c.success)return{};var e=c.payload;return!e.repo&&e.blob&&(e.repo=JSON.parse(e.blob)),e.repo=m(e.repo),e.repo=k(b,e.repo),a.each(e.repo,function(b,c){h.ensurePath(d,["descriptor",c]),a.each(b,function(a,b){h.setInPath(d,["descriptor",c,b],a)})}),h.ensurePath(d,["descriptor","types"]),a.each(e.types,function(a){h.setInPath(d,["descriptor","types",a.name],a),h.ensurePath(d,["items",a.name])}),h.ensurePath(d,["descriptor","tags"]),a.each(e.tags,function(a,b){h.setInPath(d,["descriptor","tags",b],a)}),h.setInPath(d,["descriptor","applicationInstanceVersion"],e.version),a.each(e.items,function(a){h.setInPath(d,["items",a._type,a._iid],a)}),d}function o(c,d,e,h){var j=i.getSiteDataDestination(d.type);a.each(e,f.setPartLoadingState.bind(null,c,d));var k={url:b.urlUtils.baseUrl(c.currentUrl.full)+"/apps/appBuilder/1/viewer/GetAppPartData",force:!0,destination:j,data:{applicationInstanceId:d.instanceId,appPartIds:e,itemIds:a.compact([h.pageAdditionalData])},transformFunc:function(b,g){return a.each(e,f.clearPartLoadingState.bind(null,c,d)),n(c,b,g)},error:function(){a.each(e,f.setPartAsErroneous.bind(null,c,d))},timeout:g};return[k]}function p(a,c){f.setPackageLoadingState(a,c);var d=b.urlUtils.baseUrl(a.currentUrl.full)+"/apps/appBuilder/saved/"+c.instanceId,e=i.getSiteDataDestination(c.type).concat(["descriptor"]);return{url:d,force:!0,destination:e,transformFunc:function(b){return b.success?(f.clearPackageLoadingState(a,c),k(a,b.payload)):(f.setPackageAsErroneous(a,c),m())},error:f.setPackageAsErroneous.bind(null,a,c)}}function q(a,b,c,d){var g=f.setPartAsErroneous.bind(null,a,b,c);if(f.isPackageErroneous(a,b))return g(),null;var h=i.getDescriptor(a,b.type),j=e.getDataSelector(h,c,a,b,h.applicationInstanceVersion);return j?(f.setPartLoadingState(a,b.type,c),j.getRequest(d,f.clearPartLoadingState.bind(null,a,b,c),g)):null}var g=150,h=b.objectUtils,i=c.wixappsDataHandler,j=c.wixappsLogger;return{transformAppRepo:k,transformBundledPartsData:n,ensureRepoFields:m,validateAppRepoAndFix:l,getBundledPartsDataRequest:o,getApplicationRepoRequest:p,getAppPartDataRequest:q}}),define("wixappsBuilder/util/fontUtils",["lodash","fonts","wixappsCore","wixappsBuilder/core/appRepo","wixappsBuilder/core/appPart2DataFetchingStateManager"],function(a,b,c,d,e){"use strict";b.fontUtils.registerCustomTextDataGetter("AppBuilderComponent",function(b,f){var g=b.getClientSpecMapEntry(f.appInnerID);if(!g)return null;if(!e.hasPartLoadedSuccessfully(b,g,f.appPartName))return null;var h="appbuilder",i=c.wixappsDataHandler.getDescriptor(b,h),j=i&&d.getDataSelector(i,f.appPartName,b,g,i.applicationInstanceVersion);if(!j)return null;var k=j.getData();if(!k||0===k.length)return null;var l=c.wixappsDataHandler.getDataByPath(b,h,k),m=a.compact(a.flatten([l])),n=[];return a.each(m,function(b){a.each(b,function(b){var d=c.typeNameResolver.getDataItemTypeName(b);a.contains(["wix:MediaRichText","wix:RichText"],d)&&n.push(b.text)})}),n})}),define("wixappsBuilder/core/appPart2DataRequirementsChecker",["lodash","core","wixappsCore","wixappsBuilder/core/builderDataHandler"],function(a,b,c,d){"use strict";var e=b.dataRequirementsChecker,f=c.wixappsDataHandler;e.registerCheckerForAllCompsOfType("wixapps.integration.components.AppPart2",function(b,c,e){if(!b.isViewerMode())return[];var g=c[0].data.appInnerID,h=b.getClientSpecMapEntry(g),i=a.map(c,function(a){return a.data.appPartName}),j=f.getPackageMetadata(b,h.type);j.requestedPartNames=j.requestedPartNames||[];var k=a.difference(i,j.requestedPartNames);return j.requestedPartNames=a.union(j.requestedPartNames,i),f.setPackageMetadata(j,b,h.type),k.length?d.getBundledPartsDataRequest(b,h,k,e):[]})}),define("wixappsBuilder/core/appPart2PreviewDataRequirementsChecker",["lodash","core","wixappsCore","wixappsBuilder/core/builderDataHandler","wixappsBuilder/core/appPart2DataFetchingStateManager"],function(a,b,c,d,e){"use strict";var f=b.dataRequirementsChecker,g=c.wixappsDataHandler;f.registerCheckerForAppDefId("3d590cbc-4907-4cc4-b0b1-ddf2c5edf297",function(a,b){if(a.isViewerMode())return[];var c=g.getPackageMetadata(a,b.type);return c.wasRepoRequested?[]:(g.setPackageMetadata({wasRepoRequested:!0,requestedPartNames:[]},a,b.type),d.getApplicationRepoRequest(a,b))}),f.registerCheckerForCompType("wixapps.integration.components.AppPart2",function(b,c,f){if(b.isViewerMode())return[];var h=c.data.appInnerID,i=b.getClientSpecMapEntry(h),j=g.getDescriptor(b,i.type);if(!j&&!e.isPackageErroneous(b,i))return[];var k=g.getPackageMetadata(b,i.type);k.requestedPartNames=k.requestedPartNames||[];var l=c.data.appPartName;return a.contains(k.requestedPartNames,l)?[]:(k.requestedPartNames.push(l),g.setPackageMetadata(k,b,i.type),d.getAppPartDataRequest(b,i,l,f)||[])})}),define("wixappsBuilder/core/appPart2StyleCollector",["lodash","core","wixappsCore","wixappsBuilder/core/appRepo","wixappsBuilder/core/appPart2DataFetchingStateManager"],function(a,b,c,d,e){"use strict";var f=c.wixappsDataHandler;b.styleCollector.registerClassBasedStyleCollector("wixapps.integration.components.AppPart2",function(b,g,h,i,j){var k=h.getDataByQuery(b.dataQuery,j),l=h.getClientSpecMapEntry(k.appInnerID);if(e.hasPartLoadedSuccessfully(h,l,k.appPartName)){var m=f.getDescriptor(h,l.type),n=d.getAppPartDefinition(m,k.appPartName);if(n){var o=n.viewName,p=a.filter(m.views,{name:o});a.each(p,function(a){c.styleCollector.collectViewStyles(a,g,i)}),c.styleCollector.addDefaultStyles(g,i)}}})}),define("wixappsBuilder",["core","wixappsCore","wixappsBuilder/comps/appPart2","wixappsBuilder/proxies/fieldBoxProxy","wixappsBuilder/proxies/fieldProxy","wixappsBuilder/proxies/textFieldProxy","wixappsBuilder/core/appRepo","wixappsBuilder/core/builderDataHandler","wixappsBuilder/core/appPart2DataFetchingStateManager","wixappsBuilder/util/fontUtils","wixappsBuilder/core/appPart2DataRequirementsChecker","wixappsBuilder/core/appPart2PreviewDataRequirementsChecker","wixappsBuilder/core/appPart2StyleCollector"],function(a,b,c,d,e,f,g,h,i){"use strict";return a.compFactory.register("wixapps.integration.components.AppPart2",c),b.proxyFactory.register("FieldBox",d),b.proxyFactory.register("Field",e),b.proxyFactory.register("TextField",f),{appRepo:g,builderDataHandler:h,dataFetchingStateManager:i}});