package com.zahran.informa;

import android.Manifest;
import android.app.Activity;
import android.app.KeyguardManager;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.PermissionRequest;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebChromeClient.FileChooserParams;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {
    private static final int APP_PERMISSION_REQUEST = 10;
    private static final int FILE_CHOOSER_REQUEST = 11;
    private static final int BIOMETRIC_REQUEST = 12;

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;
    private PermissionRequest pendingPermissionRequest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestAppPermissions();

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, android.webkit.WebResourceRequest request) {
                return openExternalIfNeeded(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return openExternalIfNeeded(Uri.parse(url));
            }
        });
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                runOnUiThread(() -> {
                    boolean requiresCamera = false;
                    for (String resource : request.getResources()) {
                        if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(resource)) {
                            requiresCamera = true;
                            break;
                        }
                    }

                    if (requiresCamera && checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                        pendingPermissionRequest = request;
                        requestPermissions(new String[]{Manifest.permission.CAMERA}, APP_PERMISSION_REQUEST);
                    } else {
                        request.grant(request.getResources());
                    }
                });
            }

            @Override
            public boolean onShowFileChooser(
                    WebView webView,
                    ValueCallback<Uri[]> filePathCallback,
                    FileChooserParams fileChooserParams) {
                if (MainActivity.this.filePathCallback != null) {
                    MainActivity.this.filePathCallback.onReceiveValue(null);
                }

                MainActivity.this.filePathCallback = filePathCallback;
                Intent intent = fileChooserParams.createIntent();
                intent.addCategory(Intent.CATEGORY_OPENABLE);

                try {
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST);
                } catch (Exception error) {
                    MainActivity.this.filePathCallback = null;
                    return false;
                }

                return true;
            }
        });

        webView.addJavascriptInterface(new AppBridge(), "ZahranAndroid");
        webView.loadUrl("https://zahraninforma-gym-production-4931.up.railway.app");
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == APP_PERMISSION_REQUEST && pendingPermissionRequest != null) {
            boolean granted = checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
            if (granted) {
                pendingPermissionRequest.grant(pendingPermissionRequest.getResources());
            } else {
                pendingPermissionRequest.deny();
            }
            pendingPermissionRequest = null;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == BIOMETRIC_REQUEST) {
            sendBiometricResult(resultCode == RESULT_OK);
            return;
        }

        if (requestCode != FILE_CHOOSER_REQUEST || filePathCallback == null) {
            return;
        }

        Uri[] result = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
        filePathCallback.onReceiveValue(result);
        filePathCallback = null;
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }

        super.onBackPressed();
    }

    private void requestAppPermissions() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return;
        }

        List<String> permissions = new ArrayList<>();
        addPermissionIfNeeded(permissions, Manifest.permission.CAMERA);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            addPermissionIfNeeded(permissions, Manifest.permission.READ_MEDIA_IMAGES);

            if (Build.VERSION.SDK_INT >= 34) {
                addPermissionIfNeeded(permissions, Manifest.permission.READ_MEDIA_VISUAL_USER_SELECTED);
            }
        } else {
            addPermissionIfNeeded(permissions, Manifest.permission.READ_EXTERNAL_STORAGE);

            if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
                addPermissionIfNeeded(permissions, Manifest.permission.WRITE_EXTERNAL_STORAGE);
            }
        }

        if (!permissions.isEmpty()) {
            requestPermissions(permissions.toArray(new String[0]), APP_PERMISSION_REQUEST);
        }
    }

    private void addPermissionIfNeeded(List<String> permissions, String permission) {
        if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(permission);
        }
    }

    private void sendBiometricResult(boolean ok) {
        if (webView == null) {
            return;
        }

        webView.post(() -> webView.evaluateJavascript(
                "window.handleNativeBiometricResult && window.handleNativeBiometricResult(" + (ok ? "true" : "false") + ");",
                null));
    }

    private class AppBridge {
        @JavascriptInterface
        public boolean isBiometricAvailable() {
            KeyguardManager keyguardManager = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
            return keyguardManager != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && keyguardManager.isDeviceSecure();
        }

        @JavascriptInterface
        public void authenticateBiometric() {
            runOnUiThread(() -> {
                KeyguardManager keyguardManager = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
                if (keyguardManager == null || Build.VERSION.SDK_INT < Build.VERSION_CODES.M || !keyguardManager.isDeviceSecure()) {
                    sendBiometricResult(false);
                    return;
                }

                Intent intent = keyguardManager.createConfirmDeviceCredentialIntent(
                        "Zahran Informa",
                        "أكد بصمة الجهاز أو قفل الشاشة للدخول");

                if (intent == null) {
                    sendBiometricResult(false);
                    return;
                }

                try {
                    startActivityForResult(intent, BIOMETRIC_REQUEST);
                } catch (ActivityNotFoundException error) {
                    sendBiometricResult(false);
                }
            });
        }
    }

    private boolean openExternalIfNeeded(Uri uri) {
        if (uri == null) {
            return false;
        }

        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();
        boolean isWhatsAppLink = scheme.equals("whatsapp")
                || host.equals("wa.me")
                || host.endsWith(".wa.me")
                || host.equals("whatsapp.com")
                || host.endsWith(".whatsapp.com");

        if (!isWhatsAppLink) {
            return false;
        }

        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);

        if (isPackageInstalled(this, "com.whatsapp")) {
            intent.setPackage("com.whatsapp");
        } else if (isPackageInstalled(this, "com.whatsapp.w4b")) {
            intent.setPackage("com.whatsapp.w4b");
        }

        try {
            startActivity(intent);
        } catch (ActivityNotFoundException error) {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        }

        return true;
    }

    private static boolean isPackageInstalled(Context context, String packageName) {
        try {
            context.getPackageManager().getPackageInfo(packageName, 0);
            return true;
        } catch (PackageManager.NameNotFoundException error) {
            return false;
        }
    }
}
