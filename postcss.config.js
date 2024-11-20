module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  resolve: {
    fallback: {
      "net": false,
      "tls": false,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  }

}
