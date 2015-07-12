import * as nodeunit from 'nodeunit';
import {IStep} from './step';
import {StepPipeline} from './step-pipeline';

var stepPipeline: StepPipeline<number, number>;

class AddingStep implements IStep<number, number> {
  execute(input: number, output: number): Promise<number> {
    return Promise.resolve(input + output);
  }
}

class MultiplyingStep implements IStep<number, number> {
  execute(input: number, output: number): Promise<number> {
    return Promise.resolve(input * output);
  }
}

class AddingOneStep implements IStep<number, number> {
  execute(input: number, output: number): Promise<number> {
    return Promise.resolve(output + 1);
  }
}

class FailingStep implements IStep<number, number> {
  private _error: Error;
  
  constructor(error: Error) {
    this._error = error;
  }
  
  execute(input: number, output: number) {
    return Promise.reject(this._error);
  }
}

export = {
  'execute': {
    'it should produce the correct output when all steps complete successfully': function(test: nodeunit.Test) {
      stepPipeline = new StepPipeline<number, number>([
        new AddingOneStep(),
        new AddingStep(),
        new MultiplyingStep()
      ]);
      
      stepPipeline.execute(3, 0).then((result) => {
        test.equal(result, 12);
        test.done();
      });
    },
    
    'it should reject the returned promise if one of the steps fails': function(test: nodeunit.Test) {
      var expectedError = new Error();
      
      stepPipeline = new StepPipeline<number, number>([
        new AddingOneStep(),
        new FailingStep(expectedError),
        new AddingStep(),
        new MultiplyingStep()
      ]);
      
      stepPipeline.execute(3, 0).catch((error) => {
        test.equal(error, expectedError);
        test.done();
      }); 
    }
  }
};