package com.dottransporter_app;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.bridge.WritableMap;

public class MainService extends HeadlessJsTaskService {
   @Override
   protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
   Bundle extras = intent.getExtras();
    WritableMap data = extras != null ? Arguments.fromBundle(extras) : null;
    return new HeadlessJsTaskConfig(
        "DotTransporterService", 
        data,
    5000);
  }
}