import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();

const paths = {
	js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**']
};

// Clean up dist files
gulp.task('clean', () =>
	del(['dist/**', 'coverage/**', '!dist', '!coverage'])
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
	gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
		.pipe(plugins.newer('dist'))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.babel())
		.on('error', (err) => {
			plugins.util.log(err);
			process.exit(1);
		})
		.pipe(plugins.sourcemaps.write('.', {
			includeContent: false,
			sourceRoot(file) {
				return path.relative(file.path, __dirname);
			}
		}))
		.pipe(gulp.dest('dist'))
);

// Lint Javascript
gulp.task('eslint', () =>
	gulp.src(paths.js)
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(plugins.eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(plugins.eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(plugins.eslint.failAfterError())
);

// Start server with restart on file changes
gulp.task('nodemon', ['babel'], () =>
	plugins.nodemon({
		script: path.join('dist', 'index.js'),
		ext: 'js',
		ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
		tasks: ['babel']
	})
);

gulp.task('serve', ['clean'], () => {
	runSequence('nodemon');
});

// clean and compile files, the default task
gulp.task('default', ['clean'], () => {
	runSequence('babel');
});
