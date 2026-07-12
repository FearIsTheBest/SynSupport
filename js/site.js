var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
function getRootUrl(){return window.location.origin?window.location.origin+"/":window.location.protocol+"/"+window.location.host+"/"}$(document).ready(function(){$(".navbar-hr").hide();$(".navbar-burger").click(function(){$(".navbar-burger").toggleClass("is-active");$(".navbar-menu").toggleClass("is-active");$(".navbar-hr").toggle()});$(".has-dropdown").each(function(){$(this).hasClass("is-active")||$(this).children(".navbar-dropdown").each(function(){$(this).toggleClass("is-hidden")})});$(".has-dropdown > .navbar-link").click(function(){$(this).parent().children(".navbar-dropdown").each(function(){$(this).toggleClass("is-hidden")})});$(".syn-time").each(function(){$(this).text(new Date($(this).text()).toLocaleString("en-US").replace(","," "))});$(".syn-time-title").each(function(){$(this).attr("title",new Date($(this).attr("title")).toLocaleString("en-US").replace(","," "))});$(".syn-sanitize").each(function(){let n=$(this),t=DOMPurify.sanitize(n.attr("data-untrustedinput"),{USE_PROFILES:{html:!0},FORBID_TAGS:["audio","video","button","form"],FORBID_ATTR:["class","id"]});t.trim()&&t!=="<p><\/p>"?n.html(t):n.html("ASP-B-34582: Sanitization not passed.");n.removeAttr("data-untrustedinput")});typeof jdenticon!="undefined"&&jdenticon.update(".jdenticon-icon")})
}
