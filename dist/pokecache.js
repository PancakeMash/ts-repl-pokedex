import { clearInterval } from "node:timers";
export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        }
        const age = Date.now() - entry.createdAt;
        if (age > this.#interval) {
            this.#cache.delete(key);
            return undefined;
        }
        return entry.val;
    }
    #startReapLoop() {
        if (this.#reapIntervalId) {
            return;
        }
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    stopReapLoop() {
        if (!this.#reapIntervalId) {
            return;
        }
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
    #reap() {
        for (const [key, entry] of this.#cache) {
            let age = Date.now() - entry.createdAt;
            if (age > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
}
