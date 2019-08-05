export class ComponentTranslationModel {
  public name: string;
  public path: string;
  public json: string[];

  public constructor(obj?: any) {
    this.name = obj && obj.name;
    this.path = obj && obj.path;
    this.json = (obj && obj.json) || [];
  }
}
