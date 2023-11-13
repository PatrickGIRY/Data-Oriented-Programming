package generic;

import org.junit.jupiter.api.Test;

import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;

class GenericGetTest {

    public static final CatalogData DATA = new CatalogData(Map.of("978-1779501127", new Book("Watchmen")));

    @Test
    void return_nothing_when_no_given_info_path() {

        final var result = Generic.get(DATA);

        assertThat(result).isEmpty();

    }

    @Test
    void return_one_level_data_property_when_info_path_contains_one_existing_properties() {

        final var result = Generic.get(DATA, infoPath -> infoPath
                .map(CatalogData::booksByIsbn));

        assertThat(result).hasValue(Map.of("978-1779501127", new Book("Watchmen")));
    }

    @Test
    void return_second_level_data_property_when_info_path_contains_two_existing_properties() {

        final var result = Generic.get(DATA, infoPath -> infoPath
                .map(CatalogData::booksByIsbn)
                .map("978-1779501127", Book.class));

        assertThat(result).hasValue(new Book("Watchmen"));
    }

    @Test
    void return_third_level_data_property_when_info_path_contains_three_existing_properties() {

        final var result = Generic.get(DATA, infoPath -> infoPath
                .map(CatalogData::booksByIsbn)
                .map("978-1779501127", Book.class)
                .map(Book::title));

        assertThat(result).hasValue("Watchmen");
    }

    @Test
    void return_nothing_when_info_path_contains_non_existing_property() {
        final var result = Generic.get(DATA, infoPath -> infoPath
                .map(CatalogData::booksByIsbn)
                .map("foo", Book.class)
                .map(Book::title));

        assertThat(result).isEmpty();
    }

    record CatalogData(Map<String, Book> booksByIsbn) {
    }

    record Book(String title) {
    }
}
