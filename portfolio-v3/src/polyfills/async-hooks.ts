// Browser polyfill for node:async_hooks
// This is needed because @tanstack/react-start tries to use Node.js APIs in the browser

export class AsyncLocalStorage<T> {
	private store: T | undefined;

	getStore(): T | undefined {
		return this.store;
	}

	run<R>(store: T, callback: () => R): R {
		const previousStore = this.store;
		this.store = store;
		try {
			return callback();
		} finally {
			this.store = previousStore;
		}
	}

	enterWith(store: T): void {
		this.store = store;
	}

	disable(): void {
		this.store = undefined;
	}
}

export default {
	AsyncLocalStorage,
};
