public class Immutability {
    public static void main(String[] args) {
        List<String> mutable = new ArrayList<>(List.of("alfa", "beta"));
        mutable.add("gamma");
        System.out.println(mutable);

        List<String> seedData = List.of("alpha", "beta", "gamma");
        try {
            seedData.add("delta");
        } catch (UnsupportedOperationException e) {
            System.out.println("add() threw UnsupportedOperationException, as expected");
        }

        List<String> backing = new ArrayList<>(List.of("x", "y"));
        List<String> view = Collections.unmodifiableList(backing);

        backing.add("z");
        System.out.println(view); // [x, y, z]
    }
}