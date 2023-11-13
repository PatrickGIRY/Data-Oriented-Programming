package generic;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

public final class Generic {
    private Generic() {
    }

    public static <T, R> Optional<R> get(T data) {
        return Optional.empty();
    }

    public static <T, R> Optional<R> get(T data, Function<InfoPath<T>, InfoPath<R>> extractor) {
        return extractor.apply(InfoPath.of(data)).findFirst();
    }

    public interface InfoPath<T> {

        static <T> InfoPath<T> of(T data) {
            return () -> Stream.of(data);
        }

        Stream<T> get();

        default <R> InfoPath<R> map(Function<? super T, ? extends R> mapper) {
            return () -> this.get().map(mapper);
        }
       default <K, R> InfoPath<R> map(K key, Class<R> valueType) {
            return () -> this.get().mapMulti((data, consumer) -> {
               if (data instanceof Map<?,?> m) {
                   final Object value = m.get(key);
                   if (value != null) {
                       consumer.accept(valueType.cast(value));
                   }
               }
            });
       }

        default Optional<T> findFirst() {
            return this.get().findFirst();
        }
    }
}
