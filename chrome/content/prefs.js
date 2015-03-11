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
*   This code is Copyright (C) 2012-2015 the Initial Developer. All Rights Reserved.
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
		
	// Reset button
	
	resetAllUserPrefs: function()
	{
		var prefService = Components.classes["@mozilla.org/preferences-service;1"]
      	                        .getService(Components.interfaces.nsIPrefService);
  		prefService.resetUserPrefs();
  		self.close();
	},
	
//
// Linux mode: disable Windows-only prefs
//
   onlinux: function()
   {
   let WINOnlyPrefs = ['pmcommander-pref-jumplists-enabled',
                      'pmcommander-pref-jumplists-frequent',
                      'pmcommander-pref-jumplists-recent',
                      'pmcommander-pref-jumplists-tasks',
                      'pmcommander-pref-jumplists-limit',];
   
   for (i=0; i<WINOnlyPrefs.length; i++) {
     document.getElementById(WINOnlyPrefs[i]).disabled = true;
     }
                      
   },
   
//
// Firefox mode: disable Pale Moon-only prefs
//
   firefoxmode: function()
   {
   let PMOnlyPrefs = ['pmcommander-pref-rendering-deprecated',
                      'pmcommander-pref-color-override-a11y',
                      'pmcommander-pref-net-disable-hsts',
                      'pmcommander-pref-sess-exactpos',
                      'pmcommander-pref-sess-max-concurrent',
                      'pmcommander-pref-ctrltab-useMRU',
                      'pmcommander-pref-alltabs-previews',
                      'pmcommander-pref-urlbar-rss',
                      'pmcommander-pref-tabs-resize-immediately',
                      'pmcommander-pref-tabs-tm-focusswitch',
                      'pmcommander-pref-images-background',
                      'pmcommander-pref-ui-hideplaceholders',
                      'pmcommander-pref-sec-padlock-shown',
                      'pmcommander-pref-sec-padlock-style',
                      'pmcommander-pref-sec-padlock-urlbar-fx',
                      'pmcommander-pref-sec-ssl-domain-display',
                      'pmcommander-pref-sec-ssl-allow-ocsp-unsafe'];
   
   for (i=0; i<PMOnlyPrefs.length; i++) {
     document.getElementById(PMOnlyPrefs[i]).disabled = true;
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
      if (appInfo.OS == "Linux") {
		   this.onlinux();
		}
		// Check if running in Firefox and adjust if so.
      if (appInfo.ID == "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}") {
		   this.firefoxmode();
		} else {
		   //PM mode
         if (PMprefs.getIntPref("browser.ctrlTab.recentlyUsedLimit") != 0)
				PMprefs.setBoolPref("extensions.pmcommander.ctrlTab.useMRU", true)
			else
				PMprefs.setBoolPref("extensions.pmcommander.ctrlTab.useMRU", false);
		}

		
	}
}


