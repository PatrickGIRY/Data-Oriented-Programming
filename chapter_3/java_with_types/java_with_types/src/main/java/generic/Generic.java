package generic;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

public final class Generic {
    private Generic() {
    }

    public static <T, R> Optional<R> get(T data) {
        return get(data, null);
    }

    public static <T, R> Optional<R> get(T data, Function<InfoPath<T>, InfoPath<R>> extractor) {
        return Optional.ofNullable(extractor).flatMap(e -> e.apply(InfoPath.of(data)).findFirst());
    }

    public interface InfoPath<T> {

        static <T> InfoPath<T> of(T data) {
            return () -> Stream.of(data);
        }

        Stream<T> stream();

        default <R> InfoPath<R> map(Function<? super T, ? extends R> mapper) {
            return () -> this.stream().map(mapper);
        }

        default <K, R> InfoPath<R> map(K key, Class<R> valueType) {
            return () -> this.stream().mapMulti((data, consumer) -> {
                if (data instanceof Map<?, ?> m) {
                    final Object value = m.get(key);
                    if (value != null) {
                        consumer.accept(valueType.cast(value));
                    }
                }
            });
        }

        default Optional<T> findFirst() {
            return this.stream().findFirst();
        }
    }
}
