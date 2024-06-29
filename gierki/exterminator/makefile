FILES = $(shell find ./rust/ -type f -name "*.rs")

./rust/pkg/extermination.js: $(FILES)
	wasm-pack build --target web ./rust/
