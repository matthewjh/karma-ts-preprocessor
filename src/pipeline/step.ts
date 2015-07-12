export interface IStep<TInput, TOutput> {
  execute(input: TInput, output: TOutput): Promise<TOutput>;
}