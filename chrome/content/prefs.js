/* ***** BEGIN LICENSE BLOCK *****
*   The contents of this file are subject to the Pale Moon Freeware License
*   You may not use this file except in compliance with the License. 
*   You may obtain a copy of the License at http://www.palemoon.org/freeware-license.shtml
*   
*   Software distributed under the License is distributed on an "AS IS" basis,
*   WITHOUT WARRANTY OF ANY KIND, either express or implied. 
*   
*   The Original Code is Pale Moon Commander.
*   
*   The Initial Developer of the Original Code is 
*   Mark Straver <moonchild@palemoon.org>.
*   
*   This code is Copyright (C) 2012-2017 the Initial Developer. All Rights Reserved.
*    
*   ***** END LICENSE BLOCK *****  */

var PMprefs = Components.classes["@mozilla.org/preferences-service;1"]
                .getService(Components.interfaces.nsIPrefBranch);
var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
                .getService(Components.interfaces.nsIXULAppInfo);
var osString = Components.classes["@mozilla.org/xre/app-info;1"]  
                   .getService(Components.interfaces.nsIXULRuntime).OS;


var pmcommanderPrefs =
{
//
// pref control management
//
   get d2dEnabledPref()
   {
      delete this.d2dEnabledPref;
      return this.d2dEnabledPref = document.getElementById("pmcommander-pref-d2d-enabled");
   },
   
   get d2dForcePref()
   {
      delete this.d2dForcePref;
      return this.d2dForcePref = document.getElementById("pmcommander-pref-d2d-force");
   },

   d2dGlobalChanged: function()
   {
     this.d2dForcePref.disabled = (this.d2dEnabledPref.value == false);
   },

   get layeraccEnabledPref()
   {
      delete this.layeraccEnabledPref;
      return this.layeraccEnabledPref = document.getElementById("pmcommander-pref-layers-enabled");
   },
   
   get layeraccForcePref()
   {
      delete this.layeraccForcePref;
      return this.layeraccForcePref = document.getElementById("pmcommander-pref-layers-force");
   },

   layeraccGlobalChanged: function()
   {
     this.layeraccForcePref.disabled = (this.layeraccEnabledPref.value == false);
   },

   get layersPreferD3d9()
   {
      delete this.layersPreferD3d9;
      return this.layersPreferD3d9 = PMprefs.getBoolPref("layers.prefer-d3d9");
   },

   get layersPreferOGL()
   {
      delete this.layersPreferOGL;
      return this.layersPreferOGL = PMprefs.getBoolPref("layers.prefer-opengl");
   },

   get layersModePref()
   {
      delete this.layersModePref;
      return this.layersModePref = document.getElementById("pmcommander-pref-layers-mode");
   },
   
   layersModeChanged: function()
   {
     PMprefs.setIntPref("extensions.pmcommander.layers.mode", this.layersModePref.value);
     switch (this.layersModePref.value)
     {
       case 0:
               PMprefs.setBoolPref("layers.prefer-d3d9", false);
               PMprefs.setBoolPref("layers.prefer-opengl", false);
               break;
       case 1:
               PMprefs.setBoolPref("layers.prefer-d3d9", true);
               PMprefs.setBoolPref("layers.prefer-opengl", false);
               break;
       case 2:
               PMprefs.setBoolPref("layers.prefer-d3d9", false);
               PMprefs.setBoolPref("layers.prefer-opengl", true);
               break;
     }
        
   },
   
   pdfjsChanged: function()
   {
      PMprefs.setBoolPref("pdfjs.firstRun", true);
   },

   get ctrltabModePref()
   {
      delete this.ctrltabModePref;
      return this.ctrltabModePref = document.getElementById("pmcommander-pref-ctrltab-useMRU");
   },

   ctrltabModeChanged: function()
   {
                    
     if (this.ctrltabModePref.value == true)
     {
               PMprefs.clearUserPref("browser.ctrlTab.recentlyUsedLimit");
     }
     else
     {
               PMprefs.setIntPref("browser.ctrlTab.recentlyUsedLimit", 0);
     }
   },

// DOM storage

   get domStorageEnabledPref()
   {
      delete this.domStorageEnabledPref;
      return this.domStorageEnabledPref = document.getElementById("pmcommander-pref-dom-storage-enable");
   },
   
   get domStorageLimitPref()
   {
      delete this.domStorageLimitPref;
      return this.domStorageLimitPref = document.getElementById("pmcommander-pref-dom-storage-limit");
   },
   
   domStorageChanged: function()
   {
      this.domStorageLimitPref.disabled = (this.domStorageEnabledPref.value == false);
   },

// Jumplists

   get jumplistEnabledPref()
   {
      delete this.jumplistEnabledPref;
      return this.jumplistEnabledPref = document.getElementById("pmcommander-pref-jumplists-enabled");
   },
   
   get jumplistFrequentPref()
   {
      delete this.jumplistFrequentPref;
      return this.jumplistFrequentPref = document.getElementById("pmcommander-pref-jumplists-frequent");
   },

   get jumplistRecentPref()
   {
      delete this.jumplistRecentPref;
      return this.jumplistRecentPref = document.getElementById("pmcommander-pref-jumplists-recent");
   },
   
   get jumplistTasksPref()
   {
      delete this.jumplistTasksPref;
      return this.jumplistTasksPref = document.getElementById("pmcommander-pref-jumplists-tasks");
   },
   
   get jumplistLimitPref()
   {
      delete this.jumplistLimitPref;
      return this.jumplistLimitPref = document.getElementById("pmcommander-pref-jumplists-limit");
   },

   jumplistModeChanged: function()
   {
      this.jumplistFrequentPref.disabled = (this.jumplistEnabledPref.value == false);
      this.jumplistRecentPref.disabled = (this.jumplistEnabledPref.value == false);
      this.jumplistTasksPref.disabled = (this.jumplistEnabledPref.value == false);
      this.jumplistLimitPref.disabled = (this.jumplistEnabledPref.value == false);
   },

// Fullscreen
         
   get fullscreenAutohidePref()
   {
      delete this.fullscreenAutohidePref;
      return this.fullscreenAutohidePref = document.getElementById("pmcommander-pref-fullscreen-autohide");
   },
   
   get fullscreenAnimationPref()
   {
      delete this.fullscreenAnimationPref;
      return this.fullscreenAnimationPref = document.getElementById("pmcommander-pref-fullscreen-autohide-animation");
   },
   
   fullscreenAutohideChanged: function()
   {
      this.fullscreenAnimationPref.disabled = (this.fullscreenAutohidePref.value == false);
   },
   
   get fsAPIEnabledPref()
   {
      delete this.fsAPIEnabledPref
      return this.fsAPIEnabledPref = document.getElementById("pmcommander-pref-fullscreen-api-enabled");
   },
   
   get fsAPIApprovalpref()
   {
      delete this.fsAPIApprovalpref
      return this.fsAPIApprovalpref = document.getElementById("pmcommander-pref-fullscreen-api-approval");
   },

   get fsAPIExitPref()
   {
      delete this.fsAPIExitPref
      return this.fsAPIExitPref = document.getElementById("pmcommander-pref-fullscreen-api-exit-on-deactivate");
   },
   
   get fsAPIPointerLockPref()
   {
      delete this.fsAPIPointerLockPref
      return this.fsAPIPointerLockPref = document.getElementById("pmcommander-pref-fullscreen-api-pointerlock");
   },
   
   get fsAPISecurityPref()
   {
      delete this.fsAPISecurityPref
      return this.fsAPISecurityPref = document.getElementById("pmcommander-pref-fullscreen-api-security");
   },
   
   fullscreenAPIGlobalChanged: function()
   {
      this.fsAPIApprovalpref.disabled = (this.fsAPIEnabledPref.value == false);
      this.fsAPIExitPref.disabled = (this.fsAPIEnabledPref.value == false);
      this.fsAPIPointerLockPref.disabled = (this.fsAPIEnabledPref.value == false);
      this.fsAPISecurityPref.disabled = (this.fsAPIEnabledPref.value == false);
   }, 

// Cache
   
   get diskcacheEnabledPref()
   {
      delete this.diskcacheEnabledPref;
      return this.diskcacheEnabledPref = document.getElementById("pmcommander-pref-cache-disk-enable");
   },
   
   get diskcacheAutoPref()
   {
      delete this.diskcacheAutoPref;
      return this.diskcacheAutoPref = document.getElementById("pmcommander-pref-cache-disk-auto");
   },
   
   get diskcacheCapacityPref()
   {
      delete this.diskcacheCapacityPref;
      return this.diskcacheCapacityPref = document.getElementById("pmcommander-pref-cache-disk-capacity");
   },
   
   get diskcacheElementsizePref()
   {
      delete this.diskcacheElementsizePref;
      return this.diskcacheElementsizePref = document.getElementById("pmcommander-pref-cache-disk-elementsize");
   },
   
   diskcacheGlobalChanged: function()
   {
     this.diskcacheAutoPref.disabled = (this.diskcacheEnabledPref.value == false);
     this.diskcacheCapacityPref.disabled = (this.diskcacheEnabledPref.value == false);
     this.diskcacheElementsizePref.disabled = (this.diskcacheEnabledPref.value == false);
   },
   
   get memcacheEnabledPref()
   {
      delete this.memcacheEnabledPref;
      return this.memcacheEnabledPref = document.getElementById("pmcommander-pref-cache-mem-enable");
   },
   
   get memcacheCapacityPref()
   {
      delete this.memcacheCapacityPref;
      return this.memcacheCapacityPref = document.getElementById("pmcommander-pref-cache-mem-capacity");
   },
   
   get memcacheElementsizePref()
   {
      delete this.memcacheElementsizePref;
      return this.memcacheElementsizePref = document.getElementById("pmcommander-pref-cache-mem-elementsize");
   },
   
   memcacheGlobalChanged: function()
   {
     this.memcacheCapacityPref.disabled = (this.memcacheEnabledPref.value == false);
     this.memcacheElementsizePref.disabled = (this.memcacheEnabledPref.value == false);
   },
   
   cacheCompressionChanged: function()
   {
   //Flush the disk cache after the compression level is changed
   //to prevent issues from Bug# 715198
    var cacheService = Components.classes["@mozilla.org/network/cache-service;1"]
                                 .getService(Components.interfaces.nsICacheService);
    try {
      cacheService.evictEntries(Components.interfaces.nsICache.STORE_ANYWHERE);
    } catch(ex) {}
   },
   
   // Sessionstore
   get sessionIntervalPref()
   {
      delete this.sessionIntervalPref;
      return this.sessionIntervalPref = document.getElementById("pmcommander-pref-sess-interval");
   },
   
   get sessionIntervalRawPref()
   {
      delete this.sessionIntervalRawPref;
      return this.sessionIntervalRawPref = document.getElementById("pmcommander-pref-sess-interval-raw");
   },
   
   getSessionIntervalPref: function()
   {
      this.sessionIntervalPref.value = this.sessionIntervalRawPref.value / 1000;
      PMprefs.setIntPref("extensions.pmcommander.sessionstore.interval", this.sessionIntervalPref.value);
   },
   
   setSessionIntervalPref: function()
   {
      this.sessionIntervalRawPref.value = this.sessionIntervalPref.value * 1000;
   },
   
   get restoreTabsOnDemandPref()
   {
      delete this.restoreTabsOnDemandPref;
      return this.restoreTabsOnDemandPref = document.getElementById("pmcommander-pref-sess-ondemand");
   },
   
   get restoreMaxConcurrentTabsPref()
   {
      delete this.restoreMaxConcurrentTabsPref;
      return this.restoreMaxConcurrentTabsPref = document.getElementById("pmcommander-pref-sess-max-concurrent");
   },
   
   restoreOnDemandChanged: function()
   {
     this.restoreMaxConcurrentTabsPref.disabled = (this.restoreTabsOnDemandPref.value == true);
   },
   
   // SSL/TLS
   
   get tlsMinVersionPref()
   {
      delete this.tlsMinVersionPref;
      return this.tlsMinVersionPref = document.getElementById("pmcommander-pref-sec-ssl-tls-minversion");
   },

   get tlsMaxVersionPref()
   {
      delete this.tlsMaxVersionPref;
      return this.tlsMaxVersionPref = document.getElementById("pmcommander-pref-sec-ssl-tls-maxversion");
   },

   tlsMinVersionChanged: function()
   {
      if (this.tlsMaxVersionPref.value < this.tlsMinVersionPref.value)
         PMprefs.setIntPref("security.tls.version.max", this.tlsMinVersionPref.value);
   },
   
   tlsMaxVersionChanged: function()
   {
      if (this.tlsMinVersionPref.value > this.tlsMaxVersionPref.value)
         PMprefs.setIntPref("security.tls.version.min", this.tlsMaxVersionPref.value);
   },
      
   // Reset buttons

   resetPMCUserPrefs: function()
   {
     // This should be kept in sync with ALL extension-controlled preferences!
     let ControlledPrefs = [// Graphics
                            'gfx.work-around-driver-bugs',
                            'nglayout.initialpaint.delay',
                            'webgl.prefer-native-gl',
                            'webgl.msaa-force',
                            'gl.msaa-level',
                            'gfx.direct2d.disabled',
                            'gfx.direct2d.force-enabled',
                            'layers.acceleration.disabled',
                            'layers.acceleration.draw-fps',
                            'layers.acceleration.force-enabled',
                            'extensions.pmcommander.layers.mode',
                            'layout.altrendering.enabled',
                            'gfx.font_rendering.directwrite.enabled',
                            'gfx.font_rendering.directwrite.use_gdi_table_loading',
                            'gfx.font_rendering.graphite.enabled',
                            'gfx.font_rendering.cleartype.always_use_for_content',
                            'gfx.font_rendering.cleartype.use_for_downloadable_fonts',
                            'gfx.font_rendering.cleartype_params.rendering_mode',
                            'gfx.font_rendering.cleartype_params.cleartype_level',
                            'gfx.font_rendering.cleartype_params.enhanced_contrast',
                            'gfx.font_rendering.cleartype_params.gamma',
                            'gfx.font_rendering.cleartype_params.pixel_structure',
                            'gfx.font_rendering.cleartype_params.force_gdi_classic_max_size',
                            'browser.display.ignore_accessibility_theme',
                            'gfx.color_management.enablev4',
                            'gfx.color_management.mode',
                            'gfx.color_management.rendering_intent',
                            // Networking
                            'network.buffer.cache.count',
                            'network.buffer.cache.size',
                            'network.http.spdy.enabled',
                            'network.stricttransportsecurity.enabled',
                            'network.dns.disableIPv6',
                            'network.dns.disablePrefetch',
                            'network.dnsCacheEntries',
                            'network.dnsCacheExpiration',
                            'browser.fixup.alternate.enabled',
                            'browser.fixup.alternate.prefix',
                            'browser.fixup.alternate.suffix',
                            'network.http.connection-timeout',
                            'network.http.connection-retry-timeout',
                            'network.http.fast-fallback-to-IPv4',
                            'network.http.keep-alive.timeout',
                            'network.http.max-connections',
                            'network.http.max-persistent-connections-per-proxy',
                            'network.http.max-persistent-connections-per-server',
                            'network.http.diagnostics',
                            'network.http.pipelining',
                            'network.http.pipelining.ssl',
                            'network.http.proxy.pipelining',
                            'network.http.pipelining.aggressive',
                            'network.http.pipelining.max-optimistic-requests',
                            'network.http.pipelining.maxrequests',
                            'network.http.pipelining.maxsize',
                            'network.http.pipelining.read-timeout',
                            'network.http.pipelining.reschedule-on-timeout',
                            'network.http.pipelining.reschedule-timeout',
                            // Performance
                            'javascript.enabled',
                            'javascript.options.typeinference',
                            'javascript.options.baselinejit.chrome',
                            'javascript.options.baselinejit.content',
                            'javascript.options.ion.content',
                            'javascript.options.asmjs',
                            'javascript.options.gc_on_memory_pressure',
                            'javascript.options.mem.gc_per_compartment',
                            'javascript.options.mem.disable_explicit_compartment_gc',
                            'javascript.options.mem.gc_dynamic_heap_growth',
                            'javascript.options.mem.gc_dynamic_mark_slice',
                            'javascript.options.mem.gc_incremental',
                            'javascript.options.mem.gc_incremental_slice_ms',
                            'browser.cache.disk.enable',
                            'browser.cache.disk.smart_size.enabled',
                            'browser.cache.disk.capacity',
                            'browser.cache.disk.max_entry_size',
                            'browser.cache.memory.enable',
                            'browser.cache.memory.capacity',
                            'browser.cache.memory.max_entry_size',
                            'browser.cache.compression_level',
                            'browser.cache.check_doc_frequency',
                            'browser.sessionhistory.max_entries',
                            'browser.sessionhistory.max_total_viewers',
                            'extensions.pmcommander.sessionstore.interval',
                            'browser.sessionstore.interval',
                            'browser.sessionstore.exactPos',
                            'browser.sessionstore.resume_from_crash',
                            'browser.sessionstore.restore_on_demand',
                            'browser.sessionstore.max_concurrent_tabs',
                            'browser.sessionstore.restore_pinned_tabs_on_demand',
                            'browser.sessionstore.max_tabs_undo',
                            'browser.sessionstore.max_windows_undo',
                            // UI
                            'browser.ctrlTab.previews',
                            'browser.ctrlTab.recentlyUsedLimit',
                            'extensions.pmcommander.ctrlTab.useMRU',
                            'browser.allTabs.previews',
                            'browser.urlbar.formatting.enabled',
                            'browser.urlbar.trimURLs',
                            'browser.urlbar.rss',
                            'browser.tabs.animate',
                            'browser.tabs.resize_immediately',
                            'browser.tabs.drawInTitlebar',
                            'browser.tabs.loadBookmarksInBackground',
                            'prompts.tab_modal.focusSwitch',
                            'browser.tabs.closeButtons',
                            'browser.tabs.tabClipWidth',
                            'browser.newtab.url',
                            'browser.xul.error_pages.enabled',
                            'browser.urlbar.autoFill',
                            'browser.urlbar.autoFill.typed',
                            'browser.display.standalone_images.background_color',
                            'dom.placeholder.show_on_focus',
                            'browser.taskbar.lists.enabled',
                            'browser.taskbar.lists.frequent.enabled',
                            'browser.taskbar.lists.recent.enabled',
                            'browser.taskbar.lists.tasks.enabled',
                            'browser.taskbar.lists.maxListItemCount',
                            'browser.fullscreen.autohide',
                            'browser.fullscreen.animateUp',
                            'full-screen-api.enabled',
                            'full-screen-api.approval-required',
                            'full-screen-api.exit-on-deactivate',
                            'full-screen-api.pointer-lock.enabled',
                            'full-screen-api.allow-trusted-requests-only',
                            // Security
                            'javascript.options.jit_hardening',
                            'dom.disable_image_src_set',
                            'dom.disable_window_flip',
                            'dom.disable_window_move_resize',
                            'dom.allow_scripts_to_close_windows',
                            'dom.event.clipboardevents.enabled',
                            'dom.event.contextmenu.enabled',
                            'security.fileuri.strict_origin_policy',
                            'plugins.click_to_play',
                            'browser.padlock.shown',
                            'browser.padlock.style',
                            'browser.padlock.urlbar_background',
                            'dom.disable_window_open_feature.close',
                            'dom.disable_window_open_feature.minimizable',
                            'dom.disable_window_open_feature.location',
                            'dom.disable_window_open_feature.toolbar',
                            'dom.disable_window_open_feature.status',
                            'dom.disable_window_open_feature.menubar',
                            'dom.disable_window_open_feature.personalbar',
                            'dom.disable_window_open_feature.scrollbars',
                            'dom.disable_window_open_feature.titlebar',
                            'browser.identity.ssl_domain_display',
                            'security.tls.version.min',
                            'security.tls.version.max',
                            'security.mixed_content.block_active_content',
                            'security.mixed_content.block_display_content',
                            'security.ssl.require_safe_negotiation',
                            'security.ssl.treat_unsafe_negotiation_as_broken',
                            'security.ssl.enable_false_start',
                            'security.ssl.enable_ocsp_stapling',
                            'security.ssl.allow_unsafe_ocsp_response',
                            'security.ssl3.ecdhe_ecdsa_aes_128_gcm_sha256',
                            'security.ssl3.ecdhe_rsa_aes_128_gcm_sha256',
                            'security.ssl3.dhe_dss_aes_128_sha',
                            'security.ssl3.dhe_dss_aes_256_sha',
                            'security.ssl3.dhe_dss_camellia_128_sha',
                            'security.ssl3.dhe_dss_camellia_256_sha',
                            'security.ssl3.dhe_dss_des_ede3_sha',
                            'security.ssl3.dhe_rsa_aes_128_sha',
                            'security.ssl3.dhe_rsa_aes_256_sha',
                            'security.ssl3.dhe_rsa_camellia_128_sha',
                            'security.ssl3.dhe_rsa_camellia_256_sha',
                            'security.ssl3.dhe_rsa_des_ede3_sha',
                            'security.ssl3.rsa_aes_128_sha',
                            'security.ssl3.rsa_aes_256_sha',
                            'security.ssl3.rsa_camellia_128_sha',
                            'security.ssl3.rsa_camellia_256_sha',
                            'security.ssl3.rsa_des_ede3_sha',
                            'security.ssl3.rsa_fips_des_ede3_sha',
                            'security.ssl3.rsa_rc4_128_sha',
                            'security.ssl3.rsa_rc4_128_md5',
                            'security.ssl3.rsa_seed_sha',
                            'security.ssl3.ecdh_ecdsa_aes_128_sha',
                            'security.ssl3.ecdh_ecdsa_aes_256_sha',
                            'security.ssl3.ecdh_ecdsa_des_ede3_sha',
                            'security.ssl3.ecdh_ecdsa_rc4_128_sha',
                            'security.ssl3.ecdh_rsa_aes_128_sha',
                            'security.ssl3.ecdh_rsa_aes_256_sha',
                            'security.ssl3.ecdh_rsa_des_ede3_sha',
                            'security.ssl3.ecdh_rsa_rc4_128_sha',
                            'security.ssl3.ecdhe_ecdsa_aes_128_sha',
                            'security.ssl3.ecdhe_ecdsa_aes_256_sha',
                            'security.ssl3.ecdhe_ecdsa_des_ede3_sha',
                            'security.ssl3.ecdhe_ecdsa_rc4_128_sha',
                            'security.ssl3.ecdhe_rsa_aes_128_sha',
                            'security.ssl3.ecdhe_rsa_aes_256_sha',
                            'security.ssl3.ecdhe_rsa_des_ede3_sha',
                            'security.ssl3.ecdhe_rsa_rc4_128_sha',
                            // -- Privacy
                            'browser.cache.disk_cache_ssl',
                            'network.cookie.alwaysAcceptSessionCookies',
                            'network.cookie.thirdparty.sessionOnly',
                            'geo.enabled',
                            'network.http.sendRefererHeader',
                            'network.http.referer.spoofSource',
                            'network.http.referer.trimmingPolicy',
                            'network.http.referer.XOriginPolicy',
                            // Miscellaneous
                            'pdfjs.disabled',
                            'pdfjs.firstRun',
                            'browser.bookmarks.max_backups',
                            'browser.bookmarks.autoExportHTML',
                            'dom.storage.enabled',
                            'dom.storage.default_quota'
                            ];
     for (i=0; i<ControlledPrefs.length; i++) {
       if (PMprefs.prefHasUserValue(ControlledPrefs[i]))
         PMprefs.clearUserPref(ControlledPrefs[i]);
     }
     // Cleanup based on preferences
     this.cacheCompressionChanged();
     // Re-initialize
     self.close();
   },


   resetAllUserPrefs: function()
   {
     var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                 .getService(Components.interfaces.nsIPrefService);
     prefService.resetUserPrefs();
     this.cacheCompressionChanged();
     self.close();
   },
   
//
// Non-Windows: disable Windows-only prefs
//
   nonwindows: function()
   {
   let WINOnlyPrefs = ['pmcommander-pref-d2d-enabled',
                       'pmcommander-pref-d2d-force',
                       'pmcommander-pref-fonts-directwrite',
                       'pmcommander-pref-fonts-directwrite-gdi',
                       'pmcommander-pref-jumplists-enabled',
                       'pmcommander-pref-jumplists-frequent',
                       'pmcommander-pref-jumplists-recent',
                       'pmcommander-pref-jumplists-tasks',
                       'pmcommander-pref-jumplists-limit'];
   
   for (i=0; i<WINOnlyPrefs.length; i++) {
     document.getElementById(WINOnlyPrefs[i]).disabled = true;
     }
                      
   },
   
// 
// pref init script
//
   init: function()
   {
      this.getSessionIntervalPref();
      
      // Init linked visual elements
      this.d2dGlobalChanged();
      this.layeraccGlobalChanged();
      this.jumplistModeChanged();
      this.diskcacheGlobalChanged();
      this.memcacheGlobalChanged();
      this.restoreOnDemandChanged();      
      this.domStorageChanged();
      this.fullscreenAutohideChanged();
      this.fullscreenAPIGlobalChanged();
      
      // Check if running on Linux and adjust if so.
      if (osString != "WINNT") {
         this.nonwindows();
      }
      
      if (PMprefs.getIntPref("browser.ctrlTab.recentlyUsedLimit") != 0)
         PMprefs.setBoolPref("extensions.pmcommander.ctrlTab.useMRU", true)
      else
         PMprefs.setBoolPref("extensions.pmcommander.ctrlTab.useMRU", false);
      
   }
}


