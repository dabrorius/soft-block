<template>
  <section>
    <q>{{ quote.content }}</q>
    <div class="quote__author">{{ quote.author }}</div>
  </section>
</template>

<script>
export default {
  computed: {
    quote: function() {
      const quotes = [
        {
          content:
            "You can't cross the sea merely by standing and staring at the water.",
          author: "Rabindranath Tagore"
        },
        {
          content:
            "Failure will never overtake me if my determination to succeed is strong enough.",
          author: "Og Mandino"
        },
        {
          content: "Without hard work, nothing grows but weeds.",
          author: "Gordon B. Hinckley"
        }
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
  }
};
</script>

<style scoped>
section {
  margin: 3rem 0 0;
}

q {
  font-size: 2rem;
}

.quote__author {
  margin-top: 1rem;
  color: #555;
  border-left: 3px solid #999;
  padding: 0.25rem 0 0.25rem 0.5rem;
}
</style>
