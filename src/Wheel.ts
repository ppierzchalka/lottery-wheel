export type WheelElement = {
  id: string;
  textValue: string;
};

export type WheelOptions = Partial<{
  elements: Array<WheelElement>;
  onSpinEnd: (element: WheelElement) => void;
}>;

class Wheel {
  private wheelElements: Array<WheelElement>;
  private listeners: Array<(...args: any[]) => void>;
  private wrapper: HTMLDivElement;

  constructor(htmlElement: HTMLDivElement, options?: WheelOptions) {
    const { elements = [], onSpinEnd } = options ?? {};

    this.wheelElements = elements;
    this.listeners = onSpinEnd ? [onSpinEnd] : [];
    this.wrapper = htmlElement;
  }

  public onSetElements = (newElements: Array<WheelElement>) => {
    this.wheelElements = newElements;
  };

  public onAddElement = (element: WheelElement) => {
    const { id, textValue } = element;
    console.log("adding", id, textValue);
    this.wheelElements = [...this.wheelElements, element];
    console.log(this.wheelElements);
  };

  public onRemoveElement = (id: string) => {
    console.log("Remove", id);
    this.wheelElements = this.wheelElements.filter((elem) => {
      return elem.id !== id;
    });
    console.log(this.wheelElements);
  };

  public logInfo = () => {
    console.log(this.wheelElements, this.listeners, this.wrapper);
  };

  public get elements() {
    return this.wheelElements;
  }
}

export function createWheel(
  htmlElement: HTMLDivElement,
  options?: WheelOptions
) {
  return new Wheel(htmlElement, options);
}
