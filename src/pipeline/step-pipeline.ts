import {IStep} from './step';

export class StepPipeline<TInput, TOutput> implements IStep<TInput, TOutput> {
   private _steps: IStep<TInput, TOutput>[];
   
   constructor(steps: IStep<TInput, TOutput>[]) {
     this._steps = steps;
   }
  
  execute(input: TInput, output: TOutput): Promise<TOutput> {
    var stepPromise = Promise.resolve(output);
    
    this._steps.forEach((step) => {
      stepPromise = stepPromise.then((result) => {
        return step.execute(input, result);
      });
    });
    
    return stepPromise;
  }
}
