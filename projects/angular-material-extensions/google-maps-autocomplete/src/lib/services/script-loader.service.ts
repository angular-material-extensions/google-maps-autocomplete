import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private loadedScripts: { [src: string]: boolean } = {};
  private scriptPromises: { [src: string]: Promise<void> } = {}; // Neu

  loadScript(src: string): Promise<void> {
    // Wenn das Skript bereits erfolgreich geladen wurde, sofort auflösen
    if (this.loadedScripts[src]) {
      return Promise.resolve();
    }

    // Wenn ein Ladevorgang für dieses Skript bereits im Gange ist, das vorhandene Promise zurückgeben
    if (this.scriptPromises[src]) {
      return this.scriptPromises[src];
    }

    // Ein neues Promise für das Skript-Laden erstellen und speichern
    this.scriptPromises[src] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true; // Empfohlen für externe Skripte
      script.onload = () => {
        this.loadedScripts[src] = true; // Markiere das Skript als geladen
        resolve();
      };
      script.onerror = (error: any) => {
        this.scriptPromises[src] = null; // Bei Fehler, entferne das Promise, damit erneute Versuche möglich sind
        reject(error);
      };
      document.body.appendChild(script);
    });

    return this.scriptPromises[src];
  }
}
