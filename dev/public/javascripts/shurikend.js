/*
  Inspired in jquery-cookie
  jquery-cookie: jquery-cookie.coffee
*/


(function() {
  var undefined_;

  undefined_ = void 0;

  (function($, document, undefined_) {
    var config, decoded, pluses, raw;
    raw = function(s) {
      return s;
    };
    decoded = function(s) {
      return decodeURIComponent(s.replace(pluses, " "));
    };
    pluses = /\+/g;
    config = $.cookie = function(key, value, options) {
      var cookie, cookies, days, decode, i, l, parts, t;
      if (value !== undefined) {
        options = $.extend({}, config.defaults, options);
        if (value === null) {
          options.expires = -1;
        }
        if (typeof options.expires === "number") {
          days = options.expires;
          t = options.expires = new Date();
          t.setDate(t.getDate() + days);
        }
        value = (config.json ? JSON.stringify(value) : String(value));
        return (document.cookie = [encodeURIComponent(key), "=", (config.raw ? value : encodeURIComponent(value)), (options.expires ? "; expires=" + options.expires.toUTCString() : ""), (options.path ? "; path=" + options.path : ""), (options.domain ? "; domain=" + options.domain : ""), (options.secure ? "; secure" : "")].join(""));
      }
      decode = (config.raw ? raw : decoded);
      cookies = document.cookie.split("; ");
      i = 0;
      l = cookies.length;
      while (i < l) {
        parts = cookies[i].split("=");
        if (decode(parts.shift()) === key) {
          cookie = decode(parts.join("="));
          return (config.json ? JSON.parse(cookie) : cookie);
        }
        i++;
      }
      return null;
    };
    config.defaults = {};
    return $.removeCookie = function(key, options) {
      if ($.cookie(key) !== null) {
        $.cookie(key, null, options);
        return true;
      }
      return false;
    };
  })(jQuery, document);

}).call(this);

/*
  Inspired in jquery-event-move
  jquery-event-move: jquery-event-move.coffee
*/


(function() {
  (function(module) {
    if (typeof define === "function" && define.amd) {
      return define(["jquery"], module);
    } else {
      return module(jQuery);
    }
  })(function(jQuery, undefined_) {
    var Timer, activeMouseend, activeMousemove, activeTouchend, activeTouchmove, add, addMethod, changedTouch, checkThreshold, endEvent, flagAsHandled, handled, identifiedTouch, ignoreTags, isLeftButton, mousedown, mouseend, mouseevents, mousemove, preventDefault, preventIgnoreTags, remove, removeActiveMouse, removeActiveTouch, removeMethod, removeMouse, removeTouch, requestFrame, returnFalse, returnTrue, setup, teardown, threshold, touchend, touchevents, touchmove, touchstart, trigger, triggerStart, updateEvent;
    Timer = function(fn) {
      var active, callback, running, trigger;
      trigger = function(time) {
        var active, running;
        if (active) {
          callback();
          requestFrame(trigger);
          running = true;
          return active = false;
        } else {
          return running = false;
        }
      };
      callback = fn;
      active = false;
      running = false;
      this.kick = function(fn) {
        active = true;
        if (!running) {
          return trigger();
        }
      };
      return this.end = function(fn) {
        var cb;
        cb = callback;
        if (!fn) {
          return;
        }
        if (!running) {
          fn();
        } else {
          callback = (active ? function() {
            cb();
            return fn();
          } : fn);
        }
        return active = true;
      };
    };
    returnTrue = function() {
      return true;
    };
    returnFalse = function() {
      return false;
    };
    preventDefault = function(e) {
      return e.preventDefault();
    };
    preventIgnoreTags = function(e) {
      if (ignoreTags[e.target.tagName.toLowerCase()]) {
        return;
      }
      return e.preventDefault();
    };
    isLeftButton = function(e) {
      return e.which === 1 && !e.ctrlKey && !e.altKey;
    };
    identifiedTouch = function(touchList, id) {
      var i, l;
      i = undefined_;
      l = undefined_;
      if (touchList.identifiedTouch) {
        return touchList.identifiedTouch(id);
      }
      i = -1;
      l = touchList.length;
      if ((function() {
        var _results;
        _results = [];
        while (++i < l) {
          _results.push(touchList[i].identifier === id);
        }
        return _results;
      })()) {
        return touchList[i];
      }
    };
    changedTouch = function(e, event) {
      var touch;
      touch = identifiedTouch(e.changedTouches, event.identifier);
      if (!touch) {
        return;
      }
      if (touch.pageX === event.pageX && touch.pageY === event.pageY) {
        return;
      }
      return touch;
    };
    mousedown = function(e) {
      var data;
      data = undefined_;
      if (!isLeftButton(e)) {
        return;
      }
      data = {
        target: e.target,
        startX: e.pageX,
        startY: e.pageY,
        timeStamp: e.timeStamp
      };
      add(document, mouseevents.move, mousemove, data);
      return add(document, mouseevents.cancel, mouseend, data);
    };
    mousemove = function(e) {
      var data;
      data = e.data;
      return checkThreshold(e, data, e, removeMouse);
    };
    mouseend = function(e) {
      return removeMouse();
    };
    removeMouse = function() {
      remove(document, mouseevents.move, mousemove);
      return remove(document, mouseevents.cancel, removeMouse);
    };
    touchstart = function(e) {
      var template, touch;
      touch = undefined_;
      template = undefined_;
      if (ignoreTags[e.target.tagName.toLowerCase()]) {
        return;
      }
      touch = e.changedTouches[0];
      template = {
        target: touch.target,
        startX: touch.pageX,
        startY: touch.pageY,
        timeStamp: e.timeStamp,
        identifier: touch.identifier
      };
      add(document, touchevents.move + "." + touch.identifier, touchmove, template);
      return add(document, touchevents.cancel + "." + touch.identifier, touchend, template);
    };
    touchmove = function(e) {
      var data, touch;
      data = e.data;
      touch = changedTouch(e, data);
      if (!touch) {
        return;
      }
      return checkThreshold(e, data, touch, removeTouch);
    };
    touchend = function(e) {
      var template, touch;
      template = e.data;
      touch = identifiedTouch(e.changedTouches, template.identifier);
      if (!touch) {
        return;
      }
      return removeTouch(template.identifier);
    };
    removeTouch = function(identifier) {
      remove(document, "." + identifier, touchmove);
      return remove(document, "." + identifier, touchend);
    };
    checkThreshold = function(e, template, touch, fn) {
      var distX, distY;
      distX = touch.pageX - template.startX;
      distY = touch.pageY - template.startY;
      if ((distX * distX) + (distY * distY) < (threshold * threshold)) {
        return;
      }
      return triggerStart(e, template, touch, distX, distY, fn);
    };
    handled = function() {
      this._handled = returnTrue;
      return false;
    };
    flagAsHandled = function(e) {
      return e._handled();
    };
    triggerStart = function(e, template, touch, distX, distY, fn) {
      var node, time, touches;
      node = template.target;
      touches = undefined_;
      time = undefined_;
      touches = e.targetTouches;
      time = e.timeStamp - template.timeStamp;
      template.type = "movestart";
      template.distX = distX;
      template.distY = distY;
      template.deltaX = distX;
      template.deltaY = distY;
      template.pageX = touch.pageX;
      template.pageY = touch.pageY;
      template.velocityX = distX / time;
      template.velocityY = distY / time;
      template.targetTouches = touches;
      template.finger = (touches ? touches.length : 1);
      template._handled = handled;
      template._preventTouchmoveDefault = function() {
        return e.preventDefault();
      };
      trigger(template.target, template);
      return fn(template.identifier);
    };
    activeMousemove = function(e) {
      var event, timer;
      event = e.data.event;
      timer = e.data.timer;
      return updateEvent(event, e, e.timeStamp, timer);
    };
    activeMouseend = function(e) {
      var event, timer;
      event = e.data.event;
      timer = e.data.timer;
      removeActiveMouse();
      return endEvent(event, timer, function() {
        return setTimeout((function() {
          return remove(event.target, "click", returnFalse);
        }), 0);
      });
    };
    removeActiveMouse = function(event) {
      remove(document, mouseevents.move, activeMousemove);
      return remove(document, mouseevents.end, activeMouseend);
    };
    activeTouchmove = function(e) {
      var event, timer, touch;
      event = e.data.event;
      timer = e.data.timer;
      touch = changedTouch(e, event);
      if (!touch) {
        return;
      }
      e.preventDefault();
      event.targetTouches = e.targetTouches;
      return updateEvent(event, touch, e.timeStamp, timer);
    };
    activeTouchend = function(e) {
      var event, timer, touch;
      event = e.data.event;
      timer = e.data.timer;
      touch = identifiedTouch(e.changedTouches, event.identifier);
      if (!touch) {
        return;
      }
      removeActiveTouch(event);
      return endEvent(event, timer);
    };
    removeActiveTouch = function(event) {
      remove(document, "." + event.identifier, activeTouchmove);
      return remove(document, "." + event.identifier, activeTouchend);
    };
    updateEvent = function(event, touch, timeStamp, timer) {
      var time;
      time = timeStamp - event.timeStamp;
      event.type = "move";
      event.distX = touch.pageX - event.startX;
      event.distY = touch.pageY - event.startY;
      event.deltaX = touch.pageX - event.pageX;
      event.deltaY = touch.pageY - event.pageY;
      event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
      event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
      event.pageX = touch.pageX;
      event.pageY = touch.pageY;
      return timer.kick();
    };
    endEvent = function(event, timer, fn) {
      return timer.end(function() {
        event.type = "moveend";
        trigger(event.target, event);
        return fn && fn();
      });
    };
    setup = function(data, namespaces, eventHandle) {
      add(this, "movestart.move", flagAsHandled);
      return true;
    };
    teardown = function(namespaces) {
      remove(this, "dragstart drag", preventDefault);
      remove(this, "mousedown touchstart", preventIgnoreTags);
      remove(this, "movestart", flagAsHandled);
      return true;
    };
    addMethod = function(handleObj) {
      if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
        return;
      }
      add(this, "dragstart." + handleObj.guid + " drag." + handleObj.guid, preventDefault, undefined, handleObj.selector);
      return add(this, "mousedown." + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
    };
    removeMethod = function(handleObj) {
      if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
        return;
      }
      remove(this, "dragstart." + handleObj.guid + " drag." + handleObj.guid);
      return remove(this, "mousedown." + handleObj.guid);
    };
    threshold = 6;
    add = jQuery.event.add;
    remove = jQuery.event.remove;
    trigger = function(node, type, data) {
      return jQuery.event.trigger(type, data, node);
    };
    requestFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(fn, element) {
        return window.setTimeout((function() {
          return fn();
        }), 25);
      };
    })();
    ignoreTags = {
      textarea: true,
      input: true,
      select: true,
      button: true
    };
    mouseevents = {
      move: "mousemove",
      cancel: "mouseup dragstart",
      end: "mouseup"
    };
    touchevents = {
      move: "touchmove",
      cancel: "touchend",
      end: "touchend"
    };
    jQuery.event.special.movestart = {
      setup: setup,
      teardown: teardown,
      add: addMethod,
      remove: removeMethod,
      _default: function(e) {
        var data, template;
        template = undefined_;
        data = undefined_;
        if (!e._handled()) {
          return;
        }
        template = {
          target: e.target,
          startX: e.startX,
          startY: e.startY,
          pageX: e.pageX,
          pageY: e.pageY,
          distX: e.distX,
          distY: e.distY,
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          velocityX: e.velocityX,
          velocityY: e.velocityY,
          timeStamp: e.timeStamp,
          identifier: e.identifier,
          targetTouches: e.targetTouches,
          finger: e.finger
        };
        data = {
          event: template,
          timer: new Timer(function(time) {
            return trigger(e.target, template);
          })
        };
        if (e.identifier === undefined) {
          add(e.target, "click", returnFalse);
          add(document, mouseevents.move, activeMousemove, data);
          return add(document, mouseevents.end, activeMouseend, data);
        } else {
          e._preventTouchmoveDefault();
          add(document, touchevents.move + "." + e.identifier, activeTouchmove, data);
          return add(document, touchevents.end + "." + e.identifier, activeTouchend, data);
        }
      }
    };
    jQuery.event.special.move = {
      setup: function() {
        return add(this, "movestart.move", jQuery.noop);
      },
      teardown: function() {
        return remove(this, "movestart.move", jQuery.noop);
      }
    };
    jQuery.event.special.moveend = {
      setup: function() {
        return add(this, "movestart.moveend", jQuery.noop);
      },
      teardown: function() {
        return remove(this, "movestart.moveend", jQuery.noop);
      }
    };
    add(document, "mousedown.move", mousedown);
    add(document, "touchstart.move", touchstart);
    if (typeof Array.prototype.indexOf === "function") {
      return (function(jQuery, undefined_) {
        var l, props;
        props = ["changedTouches", "targetTouches"];
        l = props.length;
        if ((function() {
          var _results;
          _results = [];
          while (l--) {
            _results.push(jQuery.event.props.indexOf(props[l]) === -1);
          }
          return _results;
        })()) {
          return jQuery.event.props.push(props[l]);
        }
      })(jQuery);
    }
  });

}).call(this);

/*
  Inspired in jquery-event-swipe
  jquery-event-swipe: jquery-event-swipe.coffee
*/


(function() {
  (function(module) {
    if (typeof define === "function" && define.amd) {
      return define(["jquery"], module);
    } else {
      return module(jQuery);
    }
  })(function(jQuery, undefined_) {
    var add, getData, moveend, remove, settings, trigger;
    moveend = function(e) {
      var event, h, w;
      w = undefined_;
      h = undefined_;
      event = undefined_;
      w = e.target.offsetWidth;
      h = e.target.offsetHeight;
      event = {
        distX: e.distX,
        distY: e.distY,
        velocityX: e.velocityX,
        velocityY: e.velocityY,
        finger: e.finger
      };
      if (e.distX > e.distY) {
        if (e.distX > -e.distY) {
          if (e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
            event.type = "swiperight";
            return trigger(e.currentTarget, event);
          }
        } else {
          if (-e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
            event.type = "swipeup";
            return trigger(e.currentTarget, event);
          }
        }
      } else {
        if (e.distX > -e.distY) {
          if (e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
            event.type = "swipedown";
            return trigger(e.currentTarget, event);
          }
        } else {
          if (-e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
            event.type = "swipeleft";
            return trigger(e.currentTarget, event);
          }
        }
      }
    };
    getData = function(node) {
      var data;
      data = jQuery.data(node, "event_swipe");
      if (!data) {
        data = {
          count: 0
        };
        jQuery.data(node, "event_swipe", data);
      }
      return data;
    };
    add = jQuery.event.add;
    remove = jQuery.event.remove;
    trigger = function(node, type, data) {
      return jQuery.event.trigger(type, data, node);
    };
    settings = {
      threshold: 0.4,
      sensitivity: 6
    };
    return jQuery.event.special.swipe = jQuery.event.special.swipeleft = jQuery.event.special.swiperight = jQuery.event.special.swipeup = jQuery.event.special.swipedown = {
      setup: function(data, namespaces, eventHandle) {
        data = getData(this);
        if (data.count++ > 0) {
          return;
        }
        add(this, "moveend", moveend);
        return true;
      },
      teardown: function() {
        var data;
        data = getData(this);
        if (--data.count > 0) {
          return;
        }
        remove(this, "moveend", moveend);
        return true;
      },
      settings: settings
    };
  });

}).call(this);

/*
  Inspired in jquery-offcanvas
  jquery-offcanvas: jquery-offcanvas.coffee
*/


(function() {
  (function(window, document, $) {
    var $selector1, $selector2, $selector3, $selector5, events;
    $selector1 = $("#topMenu");
    events = "click.fndtn";
    if ($selector1.length > 0) {
      $selector1.css("margin-top", $selector1.height() * -1);
    }
    $selector2 = $("#sidebarButton");
    if ($selector2.length > 0) {
      $("#sidebarButton").on(events, function(e) {
        e.preventDefault();
        return $("body").toggleClass("active");
      });
    }
    $selector3 = $("#menuButton");
    if ($selector3.length > 0) {
      $("#menuButton").on(events, function(e) {
        e.preventDefault();
        return $("body").toggleClass("active-menu");
      });
    }
    $selector5 = $("#switchPanels");
    if ($selector5.length > 0) {
      $("#switchPanels dd").on(events, function(e) {
        var switchToIndex, switchToPanel;
        e.preventDefault();
        switchToPanel = $(this).children("a").attr("href");
        switchToIndex = $(switchToPanel).index();
        $(this).toggleClass("active").siblings().removeClass("active");
        return $(switchToPanel).parent().css("left", switchToIndex * (-100) + "%");
      });
    }
    return $("#nav li a").on(events, function(e) {
      var $target, href;
      e.preventDefault();
      href = $(this).attr("href");
      $target = $(href);
      return $("html, body").animate({
        scrollTop: $target.offset().top
      }, 300);
    });
  })(this, document, jQuery);

}).call(this);

/*
  Inspired in foundation v.3.2
  mediaQueryToggle: mediaQueryToggle.coffee
*/


(function() {
  (function($, window) {
    "use strict";
    return $.fn.MediaQueryViewer = function(options) {
      var $doc, settings;
      settings = $.extend(options, {
        toggleKey: 77
      });
      $doc = $(document);
      $doc.on("keyup.mediaQueryViewer", ":input", function(e) {
        if (e.which === settings.toggleKey) {
          return e.stopPropagation();
        }
      });
      return $doc.on("keyup.mediaQueryViewer", function(e) {
        var $mqViewer;
        $mqViewer = $("#fqv");
        if (e.which === settings.toggleKey) {
          if ($mqViewer.length > 0) {
            return $mqViewer.remove();
          } else {
            return $("body").prepend("<div id=\"fqv\" style=\"position:fixed;top:4px;left:4px;z-index:999;color:#fff;\"><p style=\"font-size:12px;background:rgba(0,0,0,0.75);padding:5px;margin-bottom:1px;line-height:1.2;\"><span class=\"left\">Media:</span> <span style=\"font-weight:bold;\" class=\"show-for-xlarge\">Extra Large</span><span style=\"font-weight:bold;\" class=\"show-for-large\">Large</span><span style=\"font-weight:bold;\" class=\"show-for-medium\">Medium</span><span style=\"font-weight:bold;\" class=\"show-for-small\">Small</span><span style=\"font-weight:bold;\" class=\"show-for-landscape\">Landscape</span><span style=\"font-weight:bold;\" class=\"show-for-portrait\">Portrait</span><span style=\"font-weight:bold;\" class=\"show-for-touch\">Touch</span></p></div>");
          }
        }
      });
    };
  })(jQuery, this);

}).call(this);

/*
  Inspired in jquery-placeholder
  jquery-placeholder: jquery-placeholder.coffee
*/


(function() {
  (function(window, document, $) {
    var args, clearPlaceholder, hooks, isInputSupported, isTextareaSupported, placeholder, prototype, setPlaceholder, valHooks;
    args = function(elem) {
      var newAttrs, rinlinejQuery;
      newAttrs = {};
      rinlinejQuery = /^jQuery\d+$/;
      $.each(elem.attributes, function(i, attr) {
        if (attr.specified && !rinlinejQuery.test(attr.name)) {
          return newAttrs[attr.name] = attr.value;
        }
      });
      return newAttrs;
    };
    clearPlaceholder = function(event, value) {
      var $input, input;
      input = this;
      $input = $(input);
      if (input.value === $input.attr("placeholder") && $input.hasClass("placeholder")) {
        if ($input.data("placeholder-password")) {
          $input = $input.hide().next().show().attr("id", $input.removeAttr("id").data("placeholder-id"));
          if (event === true) {
            return $input[0].value = value;
          }
          return $input.focus();
        } else {
          input.value = "";
          $input.removeClass("placeholder");
          return input === document.activeElement && input.select();
        }
      }
    };
    setPlaceholder = function() {
      var $input, $origInput, $replacement, e, id, input;
      $replacement = void 0;
      input = this;
      $input = $(input);
      $origInput = $input;
      id = this.id;
      if (input.value === "") {
        if (input.type === "password") {
          if (!$input.data("placeholder-textinput")) {
            try {
              $replacement = $input.clone().attr({
                type: "text"
              });
            } catch (_error) {
              e = _error;
              $replacement = $("<input>").attr($.extend(args(this), {
                type: "text"
              }));
            }
            $replacement.removeAttr("name").data({
              "placeholder-password": true,
              "placeholder-id": id
            }).bind("focus.placeholder", clearPlaceholder);
            $input.data({
              "placeholder-textinput": $replacement,
              "placeholder-id": id
            }).before($replacement);
          }
          $input = $input.removeAttr("id").hide().prev().attr("id", id).show();
        }
        $input.addClass("placeholder");
        return $input[0].value = $input.attr("placeholder");
      } else {
        return $input.removeClass("placeholder");
      }
    };
    isInputSupported = "placeholder" in document.createElement("input");
    isTextareaSupported = "placeholder" in document.createElement("textarea");
    prototype = $.fn;
    valHooks = $.valHooks;
    hooks = void 0;
    placeholder = void 0;
    if (isInputSupported && isTextareaSupported) {
      placeholder = prototype.placeholder = function() {
        return this;
      };
      return placeholder.input = placeholder.textarea = true;
    } else {
      placeholder = prototype.placeholder = function() {
        var $this;
        $this = this;
        $this.filter((isInputSupported ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
          "focus.placeholder": clearPlaceholder,
          "blur.placeholder": setPlaceholder
        }).data("placeholder-enabled", true).trigger("blur.placeholder");
        return $this;
      };
      placeholder.input = isInputSupported;
      placeholder.textarea = isTextareaSupported;
      hooks = {
        get: function(element) {
          var $element;
          $element = $(element);
          if ($element.data("placeholder-enabled") && $element.hasClass("placeholder")) {
            return "";
          } else {
            return element.value;
          }
        },
        set: function(element, value) {
          var $element;
          $element = $(element);
          if (!$element.data("placeholder-enabled")) {
            return element.value = value;
          }
          if (value === "") {
            element.value = value;
            if (element !== document.activeElement) {
              setPlaceholder.call(element);
            }
          } else if ($element.hasClass("placeholder")) {
            clearPlaceholder.call(element, true, value) || (element.value = value);
          } else {
            element.value = value;
          }
          return $element;
        }
      };
      isInputSupported || (valHooks.input = hooks);
      isTextareaSupported || (valHooks.textarea = hooks);
      $(function() {
        return $(document).delegate("form", "submit.placeholder", function() {
          var $inputs;
          $inputs = $(".placeholder", this).each(clearPlaceholder);
          return setTimeout((function() {
            return $inputs.each(setPlaceholder);
          }), 10);
        });
      });
      return $(window).bind("beforeunload.placeholder", function() {
        return $(".placeholder").each(function() {
          return this.value = "";
        });
      });
    }
  })(this, document, jQuery);

}).call(this);

/*
  Inspired in foundation v.3.2
  alerts: alerts.coffee
*/


(function() {
  (function($, window) {
    "use strict";
    return $.fn.Alerts = function(options) {
      var settings;
      settings = $.extend({
        callback: $.noop
      }, options);
      return $(document).on("click", ".alert-box a.close", function(e) {
        e.preventDefault();
        return $(this).closest(".alert-box").fadeOut(function() {
          return $(this).remove();
        });
      });
    };
  })(jQuery, this);

}).call(this);

/*
  Inspired in foundation v.3.2
  buttons: buttons.coffee
*/


(function() {
  (function($, window, undefined_) {
    "use strict";
    return $.fn.Buttons = function(options) {
      var $doc, closeDropdowns, config, largeButtonHeight, normalButtonHeight, resetToggles, smallButtonHeight, tinyButtonHeight;
      $doc = $(document);
      config = $.extend({
        dropdownAsToggle: false,
        activeClass: "active"
      }, options);
      closeDropdowns = function(dropdown) {
        return $(".button.dropdown").find("ul").not(dropdown).removeClass("show-dropdown");
      };
      resetToggles = function(button) {
        var buttons;
        buttons = $(".button.dropdown").not(button);
        return buttons.add($("> span." + config.activeClass, buttons)).removeClass(config.activeClass);
      };
      $doc.on("click.fndtn", ".button.disabled", function(e) {
        return e.preventDefault();
      });
      $(".button.dropdown > ul", this).addClass("no-hover");
      $doc.on("click.fndtn", ".button.dropdown:not(.split), .button.dropdown.split span", function(e) {
        var $el, button, dropdown;
        $el = $(this);
        button = $el.closest(".button.dropdown");
        dropdown = $("> ul", button);
        if ($.inArray(e.target.nodeName, ["A", "BUTTON"])) {
          e.preventDefault();
        }
        return setTimeout((function() {
          closeDropdowns((config.dropdownAsToggle ? "" : dropdown));
          dropdown.toggleClass("show-dropdown");
          if (config.dropdownAsToggle) {
            resetToggles(button);
            return $el.toggleClass(config.activeClass);
          }
        }), 0);
      });
      $doc.on("click.fndtn", "body, html", function(e) {
        if (undefined === e.originalEvent) {
          return;
        }
        if (!$(e.originalEvent.target).is(".button.dropdown:not(.split), .button.dropdown.split span")) {
          closeDropdowns();
          if (config.dropdownAsToggle) {
            return resetToggles();
          }
        }
      });
      normalButtonHeight = $(".button.dropdown:not(.large):not(.small):not(.tiny):visible", this).outerHeight() - 1;
      largeButtonHeight = $(".button.large.dropdown:visible", this).outerHeight() - 1;
      smallButtonHeight = $(".button.small.dropdown:visible", this).outerHeight() - 1;
      tinyButtonHeight = $(".button.tiny.dropdown:visible", this).outerHeight() - 1;
      $(".button.dropdown:not(.large):not(.small):not(.tiny) > ul", this).css("top", normalButtonHeight);
      $(".button.dropdown.large > ul", this).css("top", largeButtonHeight);
      $(".button.dropdown.small > ul", this).css("top", smallButtonHeight);
      $(".button.dropdown.tiny > ul", this).css("top", tinyButtonHeight);
      $(".button.dropdown.up:not(.large):not(.small):not(.tiny) > ul", this).css("top", "auto").css("bottom", normalButtonHeight - 2);
      $(".button.dropdown.up.large > ul", this).css("top", "auto").css("bottom", largeButtonHeight - 2);
      $(".button.dropdown.up.small > ul", this).css("top", "auto").css("bottom", smallButtonHeight - 2);
      return $(".button.dropdown.up.tiny > ul", this).css("top", "auto").css("bottom", tinyButtonHeight - 2);
    };
  })(jQuery, this);

}).call(this);

/*
  Inspired in foundation v.3.2
  tooltips: tooltips.coffee
*/


(function() {
  (function($, window, undefined_) {
    "use strict";
    var methods, settings;
    settings = {
      bodyHeight: 0,
      selector: ".has-tip",
      additionalInheritableClasses: [],
      tooltipClass: ".tooltip",
      tipTemplate: function(selector, content) {
        return "<span data-selector=\"" + selector + "\" class=\"" + settings.tooltipClass.substring(1) + "\">" + content + "<span class=\"nub\"></span></span>";
      }
    };
    methods = {
      init: function(options) {
        settings = $.extend(settings, options);
        settings.selector = (settings.targetClass ? settings.targetClass : settings.selector);
        return this.each(function() {
          var $body;
          $body = $("body");
          if (Modernizr.touch) {
            $body.on("click.tooltip touchstart.tooltip touchend.tooltip", settings.selector, function(e) {
              e.preventDefault();
              $(settings.tooltipClass).hide();
              return methods.showOrCreateTip($(this));
            });
            $body.on("click.tooltip touchstart.tooltip touchend.tooltip", settings.tooltipClass, function(e) {
              e.preventDefault();
              return $(this).fadeOut(150);
            });
          } else {
            $body.on("mouseenter.tooltip mouseleave.tooltip", settings.selector, function(e) {
              var $this;
              $this = $(this);
              if (e.type === "mouseenter") {
                return methods.showOrCreateTip($this);
              } else {
                if (e.type === "mouseleave") {
                  return methods.hide($this);
                }
              }
            });
          }
          return $(this).data("tooltips", true);
        });
      },
      showOrCreateTip: function($target, content) {
        var $tip;
        $tip = methods.getTip($target);
        if ($tip && $tip.length > 0) {
          return methods.show($target);
        } else {
          return methods.create($target, content);
        }
      },
      getTip: function($target) {
        var selector, tip;
        selector = methods.selector($target);
        tip = null;
        if (selector) {
          tip = $("span[data-selector=" + selector + "]" + settings.tooltipClass);
        }
        if (tip.length > 0) {
          return tip;
        } else {
          return false;
        }
      },
      selector: function($target) {
        var dataSelector, id;
        id = $target.attr("id");
        dataSelector = $target.data("selector");
        if (id === undefined && dataSelector === undefined) {
          dataSelector = "tooltip" + Math.random().toString(36).substring(7);
          $target.attr("data-selector", dataSelector);
        }
        if (id) {
          return id;
        } else {
          return dataSelector;
        }
      },
      create: function($target, content) {
        var $tip, classes;
        $tip = $(settings.tipTemplate(methods.selector($target), $("<div>").html((content ? content : $target.attr("title"))).html()));
        classes = methods.inheritable_classes($target);
        $tip.addClass(classes).appendTo("body");
        if (Modernizr.touch) {
          $tip.append("<span class=\"tap-to-close\">tap to close </span>");
        }
        $target.removeAttr("title");
        return methods.show($target);
      },
      reposition: function(target, tip, classes) {
        var column, nub, nubHeight, nubWidth, objPos, tmp_width, width;
        width = undefined_;
        nub = undefined_;
        nubHeight = undefined_;
        nubWidth = undefined_;
        column = undefined_;
        objPos = undefined_;
        tip.css("visibility", "hidden").show();
        width = target.data("width");
        nub = tip.children(".nub");
        nubHeight = nub.outerHeight();
        nubWidth = nub.outerWidth();
        objPos = function(obj, top, right, bottom, left, width) {
          return obj.css({
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            "max-width": (width ? width : "auto")
          }).end();
        };
        objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", target.offset().left, width);
        objPos(nub, -nubHeight, "auto", "auto", 10);
        if ($(window).width() < 767) {
          if (target.data("mobile-width")) {
            tip.width(target.data("mobile-width")).css("left", 15).addClass("tip-override");
          } else {
            column = target.closest(".columns");
            if (column.length < 0) {
              column = $("body");
            }
            if (column.outerWidth()) {
              tip.width(column.outerWidth() - 25).css("left", 15).addClass("tip-override");
            } else {
              tmp_width = Math.ceil($(window).width() * 0.9);
              tip.width(tmp_width).css("left", 15).addClass("tip-override");
            }
          }
          objPos(nub, -nubHeight, "auto", "auto", target.offset().left);
        } else {
          if (classes && classes.indexOf("tip-top") > -1) {
            objPos(tip, target.offset().top - tip.outerHeight() - nubHeight, "auto", "auto", target.offset().left, width).removeClass("tip-override");
            objPos(nub, "auto", "auto", -nubHeight, "auto");
          } else if (classes && classes.indexOf("tip-left") > -1) {
            objPos(tip, target.offset().top + (target.outerHeight() / 2) - nubHeight, "auto", "auto", target.offset().left - tip.outerWidth() - 10, width).removeClass("tip-override");
            objPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), -nubHeight, "auto", "auto");
          } else if (classes && classes.indexOf("tip-right") > -1) {
            objPos(tip, target.offset().top + (target.outerHeight() / 2) - nubHeight, "auto", "auto", target.offset().left + target.outerWidth() + 10, width).removeClass("tip-override");
            objPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), "auto", "auto", -nubHeight);
          } else if (classes && classes.indexOf("tip-centered-top") > -1) {
            objPos(tip, target.offset().top - tip.outerHeight() - nubHeight, "auto", "auto", target.offset().left + ((target.outerWidth() - tip.outerWidth()) / 2), width).removeClass("tip-override");
            objPos(nub, "auto", (tip.outerWidth() / 2) - (nubHeight / 2), -nubHeight, "auto");
          } else if (classes && classes.indexOf("tip-centered-bottom") > -1) {
            objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", target.offset().left + ((target.outerWidth() - tip.outerWidth()) / 2), width).removeClass("tip-override");
            objPos(nub, -nubHeight, (tip.outerWidth() / 2) - (nubHeight / 2), "auto", "auto");
          }
        }
        return tip.css("visibility", "visible").hide();
      },
      inheritable_classes: function(target) {
        var classes, filtered, inheritables;
        inheritables = ["tip-top", "tip-left", "tip-bottom", "tip-right", "tip-centered-top", "tip-centered-bottom", "noradius"].concat(settings.additionalInheritableClasses);
        classes = target.attr("class");
        filtered = (classes ? $.map(classes.split(" "), function(el, i) {
          if ($.inArray(el, inheritables) !== -1) {
            return el;
          }
        }).join(" ") : "");
        return $.trim(filtered);
      },
      show: function($target) {
        var $tip;
        $tip = methods.getTip($target);
        methods.reposition($target, $tip, $target.attr("class"));
        return $tip.fadeIn(150);
      },
      hide: function($target) {
        var $tip;
        $tip = methods.getTip($target);
        return $tip.fadeOut(150);
      },
      reload: function() {
        var $self;
        $self = $(this);
        if ($self.data("tooltips")) {
          return $self.Tooltips("destroy").Tooltips("init");
        } else {
          return $self.Tooltips("init");
        }
      },
      destroy: function() {
        return this.each(function() {
          $(window).off(".tooltip");
          $(settings.selector).off(".tooltip");
          return $(settings.tooltipClass).each(function(i) {
            return $($(settings.selector).get(i)).attr("title", $(this).text());
          }).remove();
        });
      }
    };
    return $.fn.Tooltips = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error("Method " + method + " does not exist on jQuery.Tooltips");
      }
    };
  })(jQuery, this);

}).call(this);

/*
  Inspired in foundation v.3.2
  forms: forms.coffee
*/


(function() {
  (function($) {
    /*
    Helper object used to quickly adjust all hidden parent element's, display and visibility properties.
    This is currently used for the custom drop downs. When the dropdowns are contained within a reveal modal
    we cannot accurately determine the list-item elements width property, since the modal's display property is set
    to 'none'.
    
    This object will help us work around that problem.
    
    NOTE: This could also be plugin.
    
    @function hiddenFix
    */

    var hiddenFix, refreshCustomSelect, toggleCheckbox, toggleRadio;
    hiddenFix = function() {
      return {
        /*
        Sets all hidden parent elements and self to visibile.
        
        @method adjust
        @param {jQuery Object} $child
        */

        tmp: [],
        hidden: null,
        adjust: function($child) {
          var _self;
          _self = this;
          _self.hidden = $child.parents().andSelf().filter(":hidden");
          return _self.hidden.each(function() {
            var $elem;
            $elem = $(this);
            _self.tmp.push($elem.attr("style"));
            return $elem.css({
              visibility: "hidden",
              display: "block"
            });
          });
        },
        /*
        Resets the elements previous state.
        
        @method reset
        */

        reset: function() {
          var _self;
          _self = this;
          _self.hidden.each(function(i) {
            var $elem, _tmp;
            $elem = $(this);
            _tmp = _self.tmp[i];
            if (_tmp === undefined) {
              return $elem.removeAttr("style");
            } else {
              return $elem.attr("style", _tmp);
            }
          });
          _self.tmp = [];
          return _self.hidden = null;
        }
      };
    };
    jQuery.shurikend = jQuery.shurikend || {};
    jQuery.shurikend.customForms = jQuery.shurikend.customForms || {};
    $.shurikend.customForms.appendCustomMarkup = function(options) {
      var appendCustomMarkup, appendCustomSelect, defaults;
      appendCustomMarkup = function(idx, sel) {
        var $span, $this, type;
        $this = $(sel).hide();
        type = $this.attr("type");
        $span = $this.next("span.custom." + type);
        if ($span.length === 0) {
          $span = $("<span class=\"custom " + type + "\"></span>").insertAfter($this);
        }
        $span.toggleClass("checked", $this.is(":checked"));
        return $span.toggleClass("disabled", $this.is(":disabled"));
      };
      appendCustomSelect = function(idx, sel) {
        var $currentSelect, $customList, $customSelect, $listItems, $options, $selectCurrent, $selectedOption, $selector, $this, customSelectSize, hiddenFixObj, liHtml, maxWidth;
        hiddenFixObj = hiddenFix();
        $this = $(sel);
        $customSelect = $this.next("div.custom.dropdown");
        $customList = $customSelect.find("ul");
        $selectCurrent = $customSelect.find(".current");
        $selector = $customSelect.find(".selector");
        $options = $this.find("option");
        $selectedOption = $options.filter(":selected");
        maxWidth = 0;
        liHtml = "";
        $listItems = void 0;
        $currentSelect = false;
        if ($this.hasClass(options.disable_class)) {
          return;
        }
        if ($customSelect.length === 0) {
          customSelectSize = ($this.hasClass("small") ? "small" : ($this.hasClass("medium") ? "medium" : ($this.hasClass("large") ? "large" : ($this.hasClass("expand") ? "expand" : ""))));
          $customSelect = $("<div class=\"" + ["custom", "dropdown", customSelectSize].join(" ") + "\"><a href=\"#\" class=\"selector\"></a><ul /></div>");
          $selector = $customSelect.find(".selector");
          $customList = $customSelect.find("ul");
          liHtml = $options.map(function() {
            return "<li>" + $(this).html() + "</li>";
          }).get().join("");
          $customList.append(liHtml);
          $currentSelect = $customSelect.prepend("<a href=\"#\" class=\"current\">" + $selectedOption.html() + "</a>").find(".current");
          $this.after($customSelect).hide();
        } else {
          liHtml = $options.map(function() {
            return "<li>" + $(this).html() + "</li>";
          }).get().join("");
          $customList.html("").append(liHtml);
        }
        $customSelect.toggleClass("disabled", $this.is(":disabled"));
        $listItems = $customList.find("li");
        $options.each(function(index) {
          if (this.selected) {
            $listItems.eq(index).addClass("selected");
            if ($currentSelect) {
              return $currentSelect.html($(this).html());
            }
          }
        });
        $customList.css("width", "auto");
        $customSelect.css("width", "auto");
        if (!$customSelect.is(".small, .medium, .large, .expand")) {
          $customSelect.addClass("open");
          hiddenFixObj.adjust($customList);
          maxWidth = ($listItems.outerWidth() > maxWidth ? $listItems.outerWidth() : maxWidth);
          hiddenFixObj.reset();
          $customSelect.removeClass("open");
          $customSelect.width(maxWidth + 18);
          return $customList.width(maxWidth + 16);
        }
      };
      defaults = {
        disable_class: "no-custom"
      };
      options = $.extend(defaults, options);
      $("form.custom input:radio[data-customforms!=disabled]").each(appendCustomMarkup);
      $("form.custom input:checkbox[data-customforms!=disabled]").each(appendCustomMarkup);
      return $("form.custom select[data-customforms!=disabled]").each(appendCustomSelect);
    };
    refreshCustomSelect = function($select) {
      var $customSelect, $options, maxWidth;
      maxWidth = 0;
      $customSelect = $select.next();
      $options = $select.find("option");
      $customSelect.find("ul").html("");
      $options.each(function() {
        var $li;
        $li = $("<li>" + $(this).html() + "</li>");
        return $customSelect.find("ul").append($li);
      });
      $options.each(function(index) {
        if (this.selected) {
          $customSelect.find("li").eq(index).addClass("selected");
          return $customSelect.find(".current").html($(this).html());
        }
      });
      $customSelect.removeAttr("style").find("ul").removeAttr("style");
      $customSelect.find("li").each(function() {
        $customSelect.addClass("open");
        if ($(this).outerWidth() > maxWidth) {
          maxWidth = $(this).outerWidth();
        }
        return $customSelect.removeClass("open");
      });
      $customSelect.css("width", maxWidth + 18 + "px");
      return $customSelect.find("ul").css("width", maxWidth + 16 + "px");
    };
    toggleCheckbox = function($element) {
      var $input, input;
      $input = $element.prev();
      input = $input[0];
      if (false === $input.is(":disabled")) {
        input.checked = (input.checked ? false : true);
        $element.toggleClass("checked");
        return $input.trigger("change");
      }
    };
    toggleRadio = function($element) {
      var $form, $input, input;
      $input = $element.prev();
      $form = $input.closest("form.custom");
      input = $input[0];
      if (false === $input.is(":disabled")) {
        $form.find("input:radio[name=\"" + $input.attr("name") + "\"]").next().not($element).removeClass("checked");
        if (!$element.hasClass("checked")) {
          $element.toggleClass("checked");
        }
        input.checked = $element.hasClass("checked");
        return $input.trigger("change");
      }
    };
    $(document).on("click", "form.custom span.custom.checkbox", function(event) {
      event.preventDefault();
      event.stopPropagation();
      return toggleCheckbox($(this));
    });
    $(document).on("click", "form.custom span.custom.radio", function(event) {
      event.preventDefault();
      event.stopPropagation();
      return toggleRadio($(this));
    });
    $(document).on("change", "form.custom select[data-customforms!=disabled]", function(event) {
      return refreshCustomSelect($(this));
    });
    $(document).on("click", "form.custom label", function(event) {
      var $associatedElement, $customCheckbox, $customRadio;
      $associatedElement = $("#" + $(this).attr("for") + "[data-customforms!=disabled]");
      $customCheckbox = void 0;
      $customRadio = void 0;
      if ($associatedElement.length !== 0) {
        if ($associatedElement.attr("type") === "checkbox") {
          event.preventDefault();
          $customCheckbox = $(this).find("span.custom.checkbox");
          if ($customCheckbox.length === 0) {
            $customCheckbox = $(this).next("span.custom.checkbox");
          }
          if ($customCheckbox.length === 0) {
            $customCheckbox = $(this).prev("span.custom.checkbox");
          }
          return toggleCheckbox($customCheckbox);
        } else if ($associatedElement.attr("type") === "radio") {
          event.preventDefault();
          $customRadio = $(this).find("span.custom.radio");
          if ($customRadio.length === 0) {
            $customRadio = $(this).next("span.custom.radio");
          }
          if ($customRadio.length === 0) {
            $customRadio = $(this).prev("span.custom.radio");
          }
          return toggleRadio($customRadio);
        }
      }
    });
    $(document).on("click", "form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector", function(event) {
      var $dropdown, $select, $this;
      $this = $(this);
      $dropdown = $this.closest("div.custom.dropdown");
      $select = $dropdown.prev();
      event.preventDefault();
      $("div.dropdown").removeClass("open");
      if (false === $select.is(":disabled")) {
        $dropdown.toggleClass("open");
        if ($dropdown.hasClass("open")) {
          $(document).bind("click.customdropdown", function(event) {
            $dropdown.removeClass("open");
            return $(document).unbind(".customdropdown");
          });
        } else {
          $(document).unbind(".customdropdown");
        }
        return false;
      }
    });
    $(document).on("click", "form.custom div.custom.dropdown li", function(event) {
      var $customDropdown, $select, $this, selectedIndex;
      $this = $(this);
      $customDropdown = $this.closest("div.custom.dropdown");
      $select = $customDropdown.prev();
      selectedIndex = 0;
      event.preventDefault();
      event.stopPropagation();
      $("div.dropdown").removeClass("open");
      $this.closest("ul").find("li").removeClass("selected");
      $this.addClass("selected");
      $customDropdown.removeClass("open").find("a.current").html($this.html());
      $this.closest("ul").find("li").each(function(index) {
        if ($this[0] === this) {
          return selectedIndex = index;
        }
      });
      $select[0].selectedIndex = selectedIndex;
      return $select.trigger("change");
    });
    return $.fn.CustomForms = $.shurikend.customForms.appendCustomMarkup;
  })(jQuery);

}).call(this);

/*
  Inspired in foundation v.3.2
  magellan: magellan.coffee
*/


(function() {
  (function($, window) {
    "use strict";
    return $.fn.Magellan = function(options) {
      var $document, $expedition, $fixedMagellan, $lastDestination, $window, defaults;
      $window = $(window);
      $document = $(document);
      $fixedMagellan = $("[data-magellan-expedition=fixed]");
      defaults = {
        threshold: ($fixedMagellan.length ? $fixedMagellan.outerHeight(true) : 0),
        activeClass: "active"
      };
      options = $.extend({}, defaults, options);
      $document.on("magellan.arrival", "[data-magellan-arrival]", function(e) {
        var $destination, $expedition, activeClass;
        $destination = $(this);
        $expedition = $destination.closest("[data-magellan-expedition]");
        activeClass = $expedition.attr("data-magellan-active-class") || options.activeClass;
        $destination.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(this).removeClass(activeClass);
        return $destination.addClass(activeClass);
      });
      $expedition = $("[data-magellan-expedition]");
      $expedition.find("[data-magellan-arrival]:first").addClass($expedition.attr("data-magellan-active-class") || options.activeClass);
      $fixedMagellan.on("magellan.update-position", function() {
        var $el;
        $el = $(this);
        $el.data("magellan-fixed-position", "");
        return $el.data("magellan-top-offset", "");
      }).trigger("magellan.update-position");
      $window.on("resize.magellan", function() {
        return $fixedMagellan.trigger("magellan.update-position");
      });
      $window.on("scroll.magellan", function() {
        var windowScrollTop;
        windowScrollTop = $window.scrollTop();
        return $fixedMagellan.each(function() {
          var fixed_position;
          $expedition = $(this);
          if ($expedition.data("magellan-top-offset") === "") {
            $expedition.data("magellan-top-offset", $expedition.offset().top);
          }
          fixed_position = (windowScrollTop + options.threshold) > $expedition.data("magellan-top-offset");
          if ($expedition.data("magellan-fixed-position") !== fixed_position) {
            $expedition.data("magellan-fixed-position", fixed_position);
            if (fixed_position) {
              return $expedition.css({
                position: "fixed",
                top: 0
              });
            } else {
              return $expedition.css({
                position: "",
                top: ""
              });
            }
          }
        });
      });
      $lastDestination = $("[data-magellan-destination]:last");
      if ($lastDestination.length > 0) {
        return $window.on("scroll.magellan", function(e) {
          var lastDestinationTop, scrolltopPlusHeight, windowScrollTop;
          windowScrollTop = $window.scrollTop();
          scrolltopPlusHeight = windowScrollTop + $window.outerHeight(true);
          lastDestinationTop = Math.ceil($lastDestination.offset().top);
          return $("[data-magellan-destination]").each(function() {
            var $destination, destination_name, topOffset;
            $destination = $(this);
            destination_name = $destination.attr("data-magellan-destination");
            topOffset = $destination.offset().top - windowScrollTop;
            if (topOffset <= options.threshold) {
              $("[data-magellan-arrival=" + destination_name + "]").trigger("magellan.arrival");
            }
            if (scrolltopPlusHeight >= $document.outerHeight(true) && lastDestinationTop > windowScrollTop && lastDestinationTop < scrolltopPlusHeight) {
              return $("[data-magellan-arrival]:last").trigger("magellan.arrival");
            }
          });
        });
      }
    };
  })(jQuery, this);

}).call(this);

/*
  Inspired in foundation v.3.2
  modal: modal.coffee
*/


(function() {
  (function($) {
    "use strict";
    var modalQueued;
    modalQueued = false;
    $(document).on("click", "a[data-reveal-id]", function(event) {
      var modalLocation;
      event.preventDefault();
      modalLocation = $(this).attr("data-reveal-id");
      return $("#" + modalLocation).reveal($(this).data());
    });
    /*
    @module reveal
    @property {Object} [options] Reveal options
    */

    return $.fn.reveal = function(options) {
      var $doc, defaults;
      $doc = $(document);
      defaults = {
        /*
        Possible options: fade, fadeAndPop, none
        
        @property animation
        @type {String}
        @default fadeAndPop
        */

        animation: "fadeAndPop",
        /*
        Speed at which the reveal should show. How fast animtions are.
        
        @property animationSpeed
        @type {Integer}
        @default 300
        */

        animationSpeed: 300,
        /*
        Should the modal close when the background is clicked?
        
        @property closeOnBackgroundClick
        @type {Boolean}
        @default true
        */

        closeOnBackgroundClick: true,
        /*
        Specify a class name for the 'close modal' element.
        This element will close an open modal.
        
        @example
        <a href='#close' class='close-reveal-modal'>Close Me</a>
        
        @property dismissModalClass
        @type {String}
        @default close-reveal-modal
        */

        dismissModalClass: "close-reveal-modal",
        /*
        Specify a callback function that triggers 'before' the modal opens.
        
        @property open
        @type {Function}
        @default function(){}
        */

        open: $.noop,
        /*
        Specify a callback function that triggers 'after' the modal is opened.
        
        @property opened
        @type {Function}
        @default function(){}
        */

        opened: $.noop,
        /*
        Specify a callback function that triggers 'before' the modal prepares to close.
        
        @property close
        @type {Function}
        @default function(){}
        */

        close: $.noop,
        /*
        Specify a callback function that triggers 'after' the modal is closed.
        
        @property closed
        @type {Function}
        @default function(){}
        */

        closed: $.noop
      };
      options = $.extend({}, defaults, options);
      return this.not(".reveal-modal.open").each(function() {
        /*
        Unlock the modal for animation.
        
        @method unlockModal
        */

        var $closeButton, closeAnimation, closeOpenModals, closeVideos, cssOpts, destroy, lockModal, locked, modal, modalBg, openAnimation, openVideos, topMeasure, topOffset, unlockModal;
        unlockModal = function() {
          var locked;
          return locked = false;
        };
        /*
        Lock the modal to prevent further animation.
        
        @method lockModal
        */

        lockModal = function() {
          var locked;
          return locked = true;
        };
        /*
        Closes all open modals.
        
        @method closeOpenModal
        */

        closeOpenModals = function() {
          var $openModals;
          $openModals = $(".reveal-modal.open");
          if ($openModals.length === 1) {
            modalQueued = true;
            return $openModals.trigger("reveal:close");
          }
        };
        /*
        Animates the modal opening.
        Handles the modal 'open' event.
        
        @method openAnimation
        */

        openAnimation = function() {
          if (!locked) {
            lockModal();
            closeOpenModals();
            modal.addClass("open");
            if (options.animation === "fadeAndPop") {
              cssOpts.open.top = $doc.scrollTop() - topOffset;
              cssOpts.open.opacity = 0;
              modal.css(cssOpts.open);
              modalBg.fadeIn(options.animationSpeed / 2);
              modal.delay(options.animationSpeed / 2).animate({
                top: $doc.scrollTop() + topMeasure + "px",
                opacity: 1
              }, options.animationSpeed, function() {
                return modal.trigger("reveal:opened");
              });
            }
            if (options.animation === "fade") {
              cssOpts.open.top = $doc.scrollTop() + topMeasure;
              cssOpts.open.opacity = 0;
              modal.css(cssOpts.open);
              modalBg.fadeIn(options.animationSpeed / 2);
              modal.delay(options.animationSpeed / 2).animate({
                opacity: 1
              }, options.animationSpeed, function() {
                return modal.trigger("reveal:opened");
              });
            }
            if (options.animation === "none") {
              cssOpts.open.top = $doc.scrollTop() + topMeasure;
              cssOpts.open.opacity = 1;
              modal.css(cssOpts.open);
              modalBg.css({
                display: "block"
              });
              return modal.trigger("reveal:opened");
            }
          }
        };
        openVideos = function() {
          var iframe, video;
          video = modal.find(".flex-video");
          iframe = video.find("iframe");
          if (iframe.length > 0) {
            iframe.attr("src", iframe.data("src"));
            return video.fadeIn(100);
          }
        };
        /*
        Closes the modal element(s)
        Handles the modal 'close' event.
        
        @method closeAnimation
        */

        closeAnimation = function() {
          if (!locked) {
            lockModal();
            modal.removeClass("open");
            if (options.animation === "fadeAndPop") {
              modal.animate({
                top: $doc.scrollTop() - topOffset + "px",
                opacity: 0
              }, options.animationSpeed / 2, function() {
                return modal.css(cssOpts.close);
              });
              if (!modalQueued) {
                modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed, function() {
                  return modal.trigger("reveal:closed");
                });
              } else {
                modal.trigger("reveal:closed");
              }
            }
            if (options.animation === "fade") {
              modal.animate({
                opacity: 0
              }, options.animationSpeed, function() {
                return modal.css(cssOpts.close);
              });
              if (!modalQueued) {
                modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed, function() {
                  return modal.trigger("reveal:closed");
                });
              } else {
                modal.trigger("reveal:closed");
              }
            }
            if (options.animation === "none") {
              modal.css(cssOpts.close);
              if (!modalQueued) {
                modalBg.css({
                  display: "none"
                });
              }
              modal.trigger("reveal:closed");
            }
            return modalQueued = false;
          }
        };
        /*
        Destroys the modal and it's events.
        
        @method destroy
        */

        destroy = function() {
          modal.unbind(".reveal");
          modalBg.unbind(".reveal");
          $closeButton.unbind(".reveal");
          return $("body").unbind(".reveal");
        };
        closeVideos = function() {
          var iframe, video;
          video = modal.find(".flex-video");
          iframe = video.find("iframe");
          if (iframe.length > 0) {
            iframe.data("src", iframe.attr("src"));
            iframe.attr("src", "");
            return video.fadeOut(100);
          }
        };
        modal = $(this);
        topMeasure = parseInt(modal.css("top"), 10);
        topOffset = modal.height() + topMeasure;
        locked = false;
        modalBg = $(".reveal-modal-bg");
        cssOpts = {
          open: {
            top: 0,
            opacity: 0,
            visibility: "visible",
            display: "block"
          },
          close: {
            top: topMeasure,
            opacity: 1,
            visibility: "hidden",
            display: "none"
          }
        };
        $closeButton = void 0;
        if (modalBg.length === 0) {
          modalBg = $("<div />", {
            "class": "reveal-modal-bg"
          }).insertAfter(modal);
          modalBg.fadeTo("fast", 0.8);
        }
        modal.bind("reveal:open.reveal", openAnimation);
        modal.bind("reveal:open.reveal", openVideos);
        modal.bind("reveal:close.reveal", closeAnimation);
        modal.bind("reveal:closed.reveal", closeVideos);
        modal.bind("reveal:opened.reveal reveal:closed.reveal", unlockModal);
        modal.bind("reveal:closed.reveal", destroy);
        modal.bind("reveal:open.reveal", options.open);
        modal.bind("reveal:opened.reveal", options.opened);
        modal.bind("reveal:close.reveal", options.close);
        modal.bind("reveal:closed.reveal", options.closed);
        modal.trigger("reveal:open");
        $closeButton = $("." + options.dismissModalClass).bind("click.reveal", function() {
          return modal.trigger("reveal:close");
        });
        if (options.closeOnBackgroundClick) {
          modalBg.css({
            cursor: "pointer"
          });
          modalBg.bind("click.reveal", function() {
            return modal.trigger("reveal:close");
          });
        }
        return $("body").bind("keyup.reveal", function(event) {
          if (event.which === 27) {
            return modal.trigger("reveal:close");
          }
        });
      });
    };
  })(jQuery);

}).call(this);

/*
  Inspired in foundation v.3.2
  joyride: joyride.coffee
*/


(function() {
  (function($, window, undefined_) {
    "use strict";
    var Modernizr, defaults, methods, settings;
    defaults = {
      version: "2.0.3",
      tipLocation: "bottom",
      nubPosition: "auto",
      scrollSpeed: 300,
      timer: 0,
      startTimerOnClick: true,
      startOffset: 0,
      nextButton: true,
      tipAnimation: "fade",
      pauseAfter: [],
      tipAnimationFadeSpeed: 300,
      cookieMonster: false,
      cookieName: "joyride",
      cookieDomain: false,
      tipContainer: "body",
      postRideCallback: $.noop,
      postStepCallback: $.noop,
      template: {
        link: "<a href=\"#close\" class=\"joyride-close-tip\">X</a>",
        timer: "<div class=\"joyride-timer-indicator-wrap\"><span class=\"joyride-timer-indicator\"></span></div>",
        tip: "<div class=\"joyride-tip-guide\"><span class=\"joyride-nub\"></span></div>",
        wrapper: "<div class=\"joyride-content-wrapper\"></div>",
        button: "<a href=\"#\" class=\"small button joyride-next-tip\"></a>"
      }
    };
    Modernizr = Modernizr || false;
    settings = {};
    methods = {
      init: function(opts) {
        return this.each(function() {
          if ($.isEmptyObject(settings)) {
            settings = $.extend(true, defaults, opts);
            settings.document = window.document;
            settings.$document = $(settings.document);
            settings.$window = $(window);
            settings.$content_el = $(this);
            settings.body_offset = $(settings.tipContainer).position();
            settings.$tip_content = $("> li", settings.$content_el);
            settings.paused = false;
            settings.attempts = 0;
            settings.tipLocationPatterns = {
              top: ["bottom"],
              bottom: [],
              left: ["right", "top", "bottom"],
              right: ["left", "top", "bottom"]
            };
            methods.jquery_check();
            if (!$.isFunction($.cookie)) {
              settings.cookieMonster = false;
            }
            if (!settings.cookieMonster || !$.cookie(settings.cookieName)) {
              settings.$tip_content.each(function(index) {
                return methods.create({
                  $li: $(this),
                  index: index
                });
              });
              if (!settings.startTimerOnClick && settings.timer > 0) {
                methods.show("init");
                methods.startTimer();
              } else {
                methods.show("init");
              }
            }
            settings.$document.on("click.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
              e.preventDefault();
              if (settings.$li.next().length < 1) {
                return methods.end();
              } else if (settings.timer > 0) {
                clearTimeout(settings.automate);
                methods.hide();
                methods.show();
                return methods.startTimer();
              } else {
                methods.hide();
                return methods.show();
              }
            });
            settings.$document.on("click.joyride", ".joyride-close-tip", function(e) {
              e.preventDefault();
              return methods.end();
            });
            return settings.$window.bind("resize.joyride", function(e) {
              if (methods.is_phone()) {
                return methods.pos_phone();
              } else {
                return methods.pos_default();
              }
            });
          } else {
            return methods.restart();
          }
        });
      },
      resume: function() {
        methods.set_li();
        return methods.show();
      },
      tip_template: function(opts) {
        var $blank, content;
        $blank = undefined_;
        content = undefined_;
        opts.tip_class = opts.tip_class || "";
        $blank = $(settings.template.tip).addClass(opts.tip_class);
        content = $.trim($(opts.li).html()) + methods.button_text(opts.button_text) + settings.template.link + methods.timer_instance(opts.index);
        $blank.append($(settings.template.wrapper));
        $blank.first().attr("data-index", opts.index);
        $(".joyride-content-wrapper", $blank).append(content);
        return $blank[0];
      },
      timer_instance: function(index) {
        var txt;
        txt = undefined_;
        if ((index === 0 && settings.startTimerOnClick && settings.timer > 0) || settings.timer === 0) {
          txt = "";
        } else {
          txt = methods.outerHTML($(settings.template.timer)[0]);
        }
        return txt;
      },
      button_text: function(txt) {
        if (settings.nextButton) {
          txt = $.trim(txt) || "Next";
          txt = methods.outerHTML($(settings.template.button).append(txt)[0]);
        } else {
          txt = "";
        }
        return txt;
      },
      create: function(opts) {
        var $tip_content, buttonText, tipClass;
        buttonText = opts.$li.attr("data-button") || opts.$li.attr("data-text");
        tipClass = opts.$li.attr("class");
        $tip_content = $(methods.tip_template({
          tip_class: tipClass,
          index: opts.index,
          button_text: buttonText,
          li: opts.$li
        }));
        return $(settings.tipContainer).append($tip_content);
      },
      show: function(init) {
        var $timer, ii, opts, opts_arr, opts_len, p;
        opts = {};
        ii = undefined_;
        opts_arr = [];
        opts_len = 0;
        p = undefined_;
        $timer = null;
        if (settings.$li === undefined || ($.inArray(settings.$li.index(), settings.pauseAfter) === -1)) {
          if (settings.paused) {
            settings.paused = false;
          } else {
            methods.set_li(init);
          }
          settings.attempts = 0;
          if (settings.$li.length && settings.$target.length > 0) {
            opts_arr = (settings.$li.data("options") || ":").split(";");
            opts_len = opts_arr.length;
            ii = opts_len - 1;
            while (ii >= 0) {
              p = opts_arr[ii].split(":");
              if (p.length === 2) {
                opts[$.trim(p[0])] = $.trim(p[1]);
              }
              ii--;
            }
            settings.tipSettings = $.extend({}, settings, opts);
            settings.tipSettings.tipLocationPattern = settings.tipLocationPatterns[settings.tipSettings.tipLocation];
            if (!/body/i.test(settings.$target.selector)) {
              methods.scroll_to();
            }
            if (methods.is_phone()) {
              methods.pos_phone(true);
            } else {
              methods.pos_default(true);
            }
            $timer = $(".joyride-timer-indicator", settings.$next_tip);
            if (/pop/i.test(settings.tipAnimation)) {
              $timer.outerWidth(0);
              if (settings.timer > 0) {
                settings.$next_tip.show();
                $timer.animate({
                  width: $(".joyride-timer-indicator-wrap", settings.$next_tip).outerWidth()
                }, settings.timer);
              } else {
                settings.$next_tip.show();
              }
            } else if (/fade/i.test(settings.tipAnimation)) {
              $timer.outerWidth(0);
              if (settings.timer > 0) {
                settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed);
                settings.$next_tip.show();
                $timer.animate({
                  width: $(".joyride-timer-indicator-wrap", settings.$next_tip).outerWidth()
                }, settings.timer);
              } else {
                settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed);
              }
            }
            return settings.$current_tip = settings.$next_tip;
          } else if (settings.$li && settings.$target.length < 1) {
            return methods.show();
          } else {
            return methods.end();
          }
        } else {
          return settings.paused = true;
        }
      },
      is_phone: function() {
        if (Modernizr) {
          return Modernizr.mq("only screen and (max-width: 767px)");
        }
        if (settings.$window.width() < 767) {
          return true;
        } else {
          return false;
        }
      },
      hide: function() {
        settings.postStepCallback(settings.$li.index(), settings.$current_tip);
        $(".joyride-modal-bg").hide();
        return settings.$current_tip.hide();
      },
      set_li: function(init) {
        if (init) {
          settings.$li = settings.$tip_content.eq(settings.startOffset);
          methods.set_next_tip();
          settings.$current_tip = settings.$next_tip;
        } else {
          settings.$li = settings.$li.next();
          methods.set_next_tip();
        }
        return methods.set_target();
      },
      set_next_tip: function() {
        return settings.$next_tip = $(".joyride-tip-guide[data-index=" + settings.$li.index() + "]");
      },
      set_target: function() {
        var $sel, cl, id;
        cl = settings.$li.attr("data-class");
        id = settings.$li.attr("data-id");
        $sel = function() {
          if (id) {
            return $(settings.document.getElementById(id));
          } else if (cl) {
            return $("." + cl).first();
          } else {
            return $("body");
          }
        };
        return settings.$target = $sel();
      },
      scroll_to: function() {
        var tipOffset, window_half;
        window_half = undefined_;
        tipOffset = undefined_;
        window_half = settings.$window.height() / 2;
        tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight());
        return $("html, body").stop().animate({
          scrollTop: tipOffset
        }, settings.scrollSpeed);
      },
      paused: function() {
        if ($.inArray(settings.$li.index() + 1, settings.pauseAfter) === -1) {
          return true;
        }
        return false;
      },
      destroy: function() {
        settings.$document.off(".joyride");
        $(window).off(".joyride");
        $(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride");
        $(".joyride-tip-guide, .joyride-modal-bg").remove();
        clearTimeout(settings.automate);
        return settings = {};
      },
      restart: function() {
        methods.hide();
        settings.$li = undefined;
        return methods.show("init");
      },
      pos_default: function(init) {
        var $nub, half_fold, nub_height, tip_position, toggle;
        half_fold = Math.ceil(settings.$window.height() / 2);
        tip_position = settings.$next_tip.offset();
        $nub = $(".joyride-nub", settings.$next_tip);
        nub_height = Math.ceil($nub.outerHeight() / 2);
        toggle = init || false;
        if (toggle) {
          settings.$next_tip.css("visibility", "hidden");
          settings.$next_tip.show();
        }
        if (!/body/i.test(settings.$target.selector)) {
          if (methods.bottom()) {
            settings.$next_tip.css({
              top: settings.$target.offset().top + nub_height + settings.$target.outerHeight(),
              left: settings.$target.offset().left
            });
            methods.nub_position($nub, settings.tipSettings.nubPosition, "top");
          } else if (methods.top()) {
            settings.$next_tip.css({
              top: settings.$target.offset().top - settings.$next_tip.outerHeight() - nub_height,
              left: settings.$target.offset().left
            });
            methods.nub_position($nub, settings.tipSettings.nubPosition, "bottom");
          } else if (methods.right()) {
            settings.$next_tip.css({
              top: settings.$target.offset().top,
              left: settings.$target.outerWidth() + settings.$target.offset().left
            });
            methods.nub_position($nub, settings.tipSettings.nubPosition, "left");
          } else if (methods.left()) {
            settings.$next_tip.css({
              top: settings.$target.offset().top,
              left: settings.$target.offset().left - settings.$next_tip.outerWidth() - nub_height
            });
            methods.nub_position($nub, settings.tipSettings.nubPosition, "right");
          }
          if (!methods.visible(methods.corners(settings.$next_tip)) && settings.attempts < settings.tipSettings.tipLocationPattern.length) {
            $nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");
            settings.tipSettings.tipLocation = settings.tipSettings.tipLocationPattern[settings.attempts];
            settings.attempts++;
            methods.pos_default(true);
          }
        } else {
          if (settings.$li.length) {
            methods.pos_modal($nub);
          }
        }
        if (toggle) {
          settings.$next_tip.hide();
          return settings.$next_tip.css("visibility", "visible");
        }
      },
      pos_phone: function(init) {
        var $nub, nub_height, target_height, tip_height, tip_offset, toggle;
        tip_height = settings.$next_tip.outerHeight();
        tip_offset = settings.$next_tip.offset();
        target_height = settings.$target.outerHeight();
        $nub = $(".joyride-nub", settings.$next_tip);
        nub_height = Math.ceil($nub.outerHeight() / 2);
        toggle = init || false;
        $nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");
        if (toggle) {
          settings.$next_tip.css("visibility", "hidden");
          settings.$next_tip.show();
        }
        if (!/body/i.test(settings.$target.selector)) {
          if (methods.top()) {
            settings.$next_tip.offset({
              top: settings.$target.offset().top - tip_height - nub_height
            });
            $nub.addClass("bottom");
          } else {
            settings.$next_tip.offset({
              top: settings.$target.offset().top + target_height + nub_height
            });
            $nub.addClass("top");
          }
        } else {
          if (settings.$li.length) {
            methods.pos_modal($nub);
          }
        }
        if (toggle) {
          settings.$next_tip.hide();
          return settings.$next_tip.css("visibility", "visible");
        }
      },
      pos_modal: function($nub) {
        methods.center();
        $nub.hide();
        if ($(".joyride-modal-bg").length < 1) {
          $("body").append("<div class=\"joyride-modal-bg\">").show();
        }
        if (/pop/i.test(settings.tipAnimation)) {
          return $(".joyride-modal-bg").show();
        } else {
          return $(".joyride-modal-bg").fadeIn(settings.tipAnimationFadeSpeed);
        }
      },
      center: function() {
        var $w;
        $w = settings.$window;
        settings.$next_tip.css({
          top: (($w.height() - settings.$next_tip.outerHeight()) / 2) + $w.scrollTop(),
          left: (($w.width() - settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft()
        });
        return true;
      },
      bottom: function() {
        return /bottom/i.test(settings.tipSettings.tipLocation);
      },
      top: function() {
        return /top/i.test(settings.tipSettings.tipLocation);
      },
      right: function() {
        return /right/i.test(settings.tipSettings.tipLocation);
      },
      left: function() {
        return /left/i.test(settings.tipSettings.tipLocation);
      },
      corners: function(el) {
        var bottom, right, w;
        w = settings.$window;
        right = w.width() + w.scrollLeft();
        bottom = w.width() + w.scrollTop();
        return [el.offset().top <= w.scrollTop(), right <= el.offset().left + el.outerWidth(), bottom <= el.offset().top + el.outerHeight(), w.scrollLeft() >= el.offset().left];
      },
      visible: function(hidden_corners) {
        var i;
        i = hidden_corners.length;
        if ((function() {
          var _results;
          _results = [];
          while (i--) {
            _results.push(hidden_corners[i]);
          }
          return _results;
        })()) {
          return false;
        }
        return true;
      },
      nub_position: function(nub, pos, def) {
        if (pos === "auto") {
          return nub.addClass(def);
        } else {
          return nub.addClass(pos);
        }
      },
      startTimer: function() {
        if (settings.$li.length) {
          return settings.automate = setTimeout(function() {
            methods.hide();
            methods.show();
            return methods.startTimer();
          }, settings.timer);
        } else {
          return clearTimeout(settings.automate);
        }
      },
      end: function() {
        if (settings.cookieMonster) {
          $.cookie(settings.cookieName, "ridden", {
            expires: 365,
            domain: settings.cookieDomain
          });
        }
        if (settings.timer > 0) {
          clearTimeout(settings.automate);
        }
        $(".joyride-modal-bg").hide();
        settings.$current_tip.hide();
        settings.postStepCallback(settings.$li.index(), settings.$current_tip);
        return settings.postRideCallback(settings.$li.index(), settings.$current_tip);
      },
      jquery_check: function() {
        if (!$.isFunction($.fn.on)) {
          $.fn.on = function(types, sel, fn) {
            return this.delegate(sel, types, fn);
          };
          $.fn.off = function(types, sel, fn) {
            return this.undelegate(sel, types, fn);
          };
          return false;
        }
        return true;
      },
      outerHTML: function(el) {
        return el.outerHTML || new XMLSerializer().serializeToString(el);
      },
      version: function() {
        return settings.version;
      }
    };
    return $.fn.joyride = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error("Method " + method + " does not exist on jQuery.joyride");
      }
    };
  })(jQuery, this);

}).call(this);

/*
  Inspired in foundation v.3.2
  navigation: navigation.coffee
*/


(function() {
  (function($, window, undefined_) {
    "use strict";
    return $.fn.Navigation = function(options) {
      var lockNavBar;
      lockNavBar = false;
      if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
        $(document).on("click.fndtn touchstart.fndtn", ".nav-bar a.flyout-toggle", function(e) {
          var flyout;
          e.preventDefault();
          flyout = $(this).siblings(".flyout").first();
          if (lockNavBar === false) {
            $(".nav-bar .flyout").not(flyout).slideUp(500);
            flyout.slideToggle(500, function() {
              return lockNavBar = false;
            });
          }
          return lockNavBar = true;
        });
        return $(".nav-bar>li.has-flyout", this).addClass("is-touch");
      } else {
        return $(".nav-bar>li.has-flyout", this).on("mouseenter mouseleave", function(e) {
          var flyout, hasFocus, inputs;
          if (e.type === "mouseenter") {
            $(".nav-bar").find(".flyout").hide();
            $(this).children(".flyout").show();
          }
          if (e.type === "mouseleave") {
            flyout = $(this).children(".flyout");
            inputs = flyout.find("input");
            hasFocus = function(inputs) {
              var focus;
              focus = undefined_;
              if (inputs.length > 0) {
                inputs.each(function() {
                  if ($(this).is(":focus")) {
                    return focus = true;
                  }
                });
                return focus;
              }
              return false;
            };
            if (!hasFocus(inputs)) {
              return $(this).children(".flyout").hide();
            }
          }
        });
      }
    };
  })(jQuery, this);

}).call(this);

/*
  Inspired in foundation v.3.2
  app: app.coffee
*/


(function() {
  (function($, window) {
    "use strict";
    var $doc, Modernizr;
    $doc = $(document);
    Modernizr = window.Modernizr;
    $(document).ready(function() {
      if ($.fn.Alerts) {
        $doc.Alerts();
      } else {
        null;
      }
      if ($.fn.Buttons) {
        $doc.Buttons();
      } else {
        null;
      }
      if ($.fn.Accordion) {
        $doc.Accordion();
      } else {
        null;
      }
      if ($.fn.Navigation) {
        $doc.Navigation();
      } else {
        null;
      }
      if ($.fn.TopBar) {
        $doc.TopBar();
      } else {
        null;
      }
      if ($.fn.CustomForms) {
        $doc.CustomForms();
      } else {
        null;
      }
      if ($.fn.MediaQueryViewer) {
        $doc.MediaQueryViewer();
      } else {
        null;
      }
      if ($.fn.Tabs) {
        $doc.Tabs({
          callback: $.shurikend.customForms.appendCustomMarkup
        });
      } else {
        null;
      }
      if ($.fn.Tooltips) {
        $doc.Tooltips();
      } else {
        null;
      }
      if ($.fn.Magellan) {
        $doc.Magellan();
      } else {
        null;
      }
      if ($.fn.placeholder) {
        return $("input, textarea").placeholder();
      } else {
        return null;
      }
    });
    if (Modernizr.touch && !window.location.hash) {
      return $(window).load(function() {
        return setTimeout((function() {
          if ($(window).scrollTop() < 20) {
            return window.scrollTo(0, 1);
          }
        }), 0);
      });
    }
  })(jQuery, this);

}).call(this);
