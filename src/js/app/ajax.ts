export interface AjaxHandle<T = unknown> {
  abort(): void;
  promise(): Promise<T>;
}

interface AjaxOptions {
  contentType?: string;
}

function makeHandle<T>(
  fetcher: (signal: AbortSignal) => Promise<Response>
): AjaxHandle<T> {
  const controller = new AbortController();
  let _resolve!: (value: T) => void;
  let _reject!: (reason?: unknown) => void;

  const _promise = new Promise<T>((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  fetcher(controller.signal)
    .then((r) => r.json() as Promise<T>)
    .then(_resolve)
    .catch((err: unknown) => {
      if (err instanceof Error && err.name !== 'AbortError') {
        _reject(err);
      }
    });

  return {
    abort: () => controller.abort(),
    promise: () => _promise,
  };
}

const ajax = {
  post<T = unknown>(
    url: string,
    data?: unknown,
    options: AjaxOptions = {}
  ): AjaxHandle<T> {
    const contentType = options.contentType ?? 'application/x-www-form-urlencoded';

    let body: string;
    if (typeof data === 'string') {
      body = data;
    } else if (data != null && typeof data === 'object') {
      body = contentType.includes('json')
        ? JSON.stringify(data)
        : new URLSearchParams(data as Record<string, string>).toString();
    } else {
      body = '';
    }

    return makeHandle<T>((signal) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body,
        signal,
      })
    );
  },

  get<T = unknown>(url: string, data?: Record<string, string>): AjaxHandle<T> {
    const params = data ? '?' + new URLSearchParams(data).toString() : '';
    return makeHandle<T>((signal) => fetch(url + params, { signal }));
  },
};

export default ajax;
