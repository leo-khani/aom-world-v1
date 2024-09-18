type QueueItem = () => Promise<void>;

class RequestQueue {
  private queue: QueueItem[] = [];
  private concurrentRequests = 0;
  private maxConcurrentRequests = 5; // Adjust this number as needed

  async enqueue(item: QueueItem): Promise<void> {
    this.queue.push(item);
    this.processQueue();
  }

  private async processQueue() {
    if (this.concurrentRequests >= this.maxConcurrentRequests) {
      return;
    }

    const item = this.queue.shift();
    if (!item) {
      return;
    }

    this.concurrentRequests++;
    try {
      await item();
    } finally {
      this.concurrentRequests--;
      this.processQueue();
    }
  }
}

export const globalRequestQueue = new RequestQueue();