import {clearInterval} from "node:timers";

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined =  undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }


    add<T>(key: string, val: T):void {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        }
        const age = Date.now() - entry.createdAt;
        if (age > this.#interval) {
            this.#cache.delete(key);
            return undefined;
        }

        return entry.val as T;
    }

    #startReapLoop():void {
        if (this.#reapIntervalId) {
            return;
        }

        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop():void {
        if (!this.#reapIntervalId) {
            return;
        }

        clearInterval(this.#reapIntervalId)
        this.#reapIntervalId = undefined;
    }

    #reap():void {
        for (const [key, entry] of this.#cache) {
            let age = Date.now() - entry.createdAt;
            if (age > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
}

export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

