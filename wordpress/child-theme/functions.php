<?php
/**
 * GPU.LT Child Theme — functions.php
 * Enqueues parent theme styles, child styles, and dark-mode script.
 */

add_action( 'wp_enqueue_scripts', 'gpult_child_enqueue' );
function gpult_child_enqueue() {
    // Parent theme stylesheet
    wp_enqueue_style(
        'hello-elementor-style',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme( 'hello-elementor' )->get( 'Version' )
    );

    // Child theme stylesheet
    wp_enqueue_style(
        'gpult-child-style',
        get_stylesheet_uri(),
        [ 'hello-elementor-style' ],
        wp_get_theme()->get( 'Version' )
    );

    // Dark mode script (must run before paint to avoid flash)
    wp_enqueue_script(
        'gpult-dark-mode',
        get_stylesheet_directory_uri() . '/dark-mode.js',
        [],
        wp_get_theme()->get( 'Version' ),
        false // load in <head>
    );
}

/**
 * Inline script in <head> to set data-theme before first paint,
 * preventing flash of wrong theme on load.
 */
add_action( 'wp_head', 'gpult_theme_preload', 1 );
function gpult_theme_preload() {
    ?>
    <script>
    (function(){
        var t = localStorage.getItem('theme');
        if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    })();
    </script>
    <?php
}
