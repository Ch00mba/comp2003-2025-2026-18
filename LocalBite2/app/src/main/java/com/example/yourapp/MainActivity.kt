package com.example.yourapp

import android.graphics.Color
import android.os.Bundle
import android.text.SpannableString
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val signUpTextView = findViewById<TextView>(R.id.signUpTextView)

        val text = "Don't have an account? Sign Up"
        val spannable = SpannableString(text)
        val start = text.indexOf("Sign Up")
        val end = start + "Sign Up".length

        // Red color
        spannable.setSpan(
            android.text.style.ForegroundColorSpan(Color.RED),
            start, end,
            SpannableString.SPAN_EXCLUSIVE_EXCLUSIVE
        )

        // Clickable
        spannable.setSpan(object : ClickableSpan() {
            override fun onClick(widget: View) {
                Toast.makeText(this@MainActivity, "Navigate to Sign Up", Toast.LENGTH_SHORT).show()
            }
        }, start, end, SpannableString.SPAN_EXCLUSIVE_EXCLUSIVE)

        signUpTextView.text = spannable
        signUpTextView.movementMethod = LinkMovementMethod.getInstance()
    }
}
