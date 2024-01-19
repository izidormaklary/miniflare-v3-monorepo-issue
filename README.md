# miniflare-v3-monorepo-issue

supposed to reproduce the error from [issue#4721](https://github.com/cloudflare/workers-sdk/issues/4721)


Includes a very basic mono-repo setup.

### setup

```shell
yarn install
#builds worker packages and starts miniflare
yarn start 
```


### endpoints

- `/worker1` : exported handler that throws an error
- `/worker2` : exported handler with **dynamically imported function** that throws an error
- `/bound` : exported handler with **DO binding** that throws error which then throws:
```
Local Workers] Workers are listening on port 3002.
workerd/util/symbolizer.c++:98: warning: Not symbolizing stack traces because $LLVM_SYMBOLIZER is not set. To symbolize stack traces, set $LLVM_SYMBOLIZER to the location of the llvm-symbolizer binary. When running tests under bazel, use `--test_env=LLVM_SYMBOLIZER=<path>`.
workerd/jsg/util.c++:281: error: e = workerd/io/worker.c++:2907: failed: broken.ignored; no such actor class; c = Binsing
stack: 1045707ff 1040645df 1040616a7 104069577 1040690bb 1060538f3 10407c453 1048ce634 1048d0b33 104063a24 104608734; sentryErrorContext = jsgInternalError
```
