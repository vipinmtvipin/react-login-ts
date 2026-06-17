import { LoginRepositoryImpl } from "../../data/repository/LoginRepositoryImpl";
import { useAlert } from "../../core/utils/UseAlert";
import { useLogger } from "../../core/utils/UseLogger";
import { useState } from "react";

export const useLogin = (repository: LoginRepositoryImpl) => {
  const logger = useLogger();
  const notify = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const login = async (request: { "": "" }) => {
    setIsLoading(true);

    try {
      const response = await repository.login(request);
      notify.success("Login Correctly!");
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        logger.error(err.message);
      } else {
        setError("Something went wrong");
        logger.error("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };



  // const queryClient = useQueryClient();
  // const createTodo = useMutation({
  //   mutationFn: (request : {'':''}) => repository.login(request),
  //   onSuccess: () => {
  //    // queryClient.invalidateQueries({ queryKey: ["todos"] });
  //     notify.success("Login Correctly!");
  //   },
  //   onError: () => {
  //     logger.error("Something goes wrong..");
  //   },
  // });

  // return createTodo;
};
